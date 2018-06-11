<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;
use yii\helpers\Console;
use Facebook\WebDriver\Remote;
use yii\base\Exception;
use common\models\Game;

class ScrappingController extends Controller
{
    public function actionIndex()
    {
        // $req = Yii::$app->whoScoredClient->get('5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
        // $res = Yii::$app->whoScoredClient->send($req);
        // Console::output($res->data);
        $host = 'http://localhost:4444/wd/hub';
        $driver = Remote\RemoteWebDriver::create($host, Remote\DesiredCapabilities::chrome());
        $driver->get('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/3768/Stages/10274/Fixtures/International-FIFA-World-Cup-2014');
        // $driver->get('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
        $pageSource = $driver->getPageSource();
        // Console::output($pageSource);
        file_put_contents('whoscored.com2.html', $pageSource);
    }

    public function actionParse()
    {
        Game::deleteAll();
        $dom = new \domDocument;
        libxml_use_internal_errors(true);
        $dom->loadHTML(file_get_contents('whoscored.com2.html'));
        $dom->preserveWhiteSpace = false;
        $table = $dom->getElementById('tournament-fixture');
        $tbody = $table->childNodes[0];
        foreach ($tbody->childNodes as $child) {
            if ($child->getAttribute('class') == 'rowgroupheader') {
                $date = $child->nodeValue;
                continue;
            }

            if (stripos($child->getAttribute('class'), 'item') !== false) {
                // iterate tr element
                foreach ($child->childNodes as $child2) {
                    if (stripos($child2->getAttribute('class'), 'time') !== false) {
                        $time = $child2->nodeValue;
                    }
                    if (stripos($child2->getAttribute('class'), 'home') !== false) {
                        $homeTeam = preg_replace("/\d+/", "", $child2->nodeValue);
                    }
                    if (stripos($child2->getAttribute('class'), 'away') !== false) {
                        $awayTeam = preg_replace("/\d+/", "", $child2->nodeValue);
                    }
                    if (stripos($child2->getAttribute('class'), 'result') !== false) {
                        $result = preg_replace("/\s+/", "", $child2->nodeValue);
                    }
                }
            }
            $date = date('Y-m-d', strtotime($date));
            $time = date('H:i:s', strtotime($time));

            /**
             * $time
             * $homeTeam
             * $awayTeam
             * $result
             */
            $dateTime = $date . ' ' . $time;
            $game = new Game([
                'date' => $dateTime,
                'local_team' => $homeTeam,
                'away_team' => $awayTeam,
                'result' => $result == 'vs' ? null : $result,
                'status' => Game::STATUS_PLAYED
            ]);
            if (!$game->save()) {
                throw new Exception($game->errors);
            }
        }
    }
}