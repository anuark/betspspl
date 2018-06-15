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
    public function actionIndex($fileName = null)
    {
        // $req = Yii::$app->whoScoredClient->get('5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
        // $res = Yii::$app->whoScoredClient->send($req);
        // Console::output($res->data);
        $host = 'http://localhost:4444/wd/hub';
        $chromeDesiredCaps = Remote\DesiredCapabilities::chrome('chromeOptions', ['args' => ['--headless']]);
        $driver = Remote\RemoteWebDriver::create($host, $chromeDesiredCaps);
        // $driver->get('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/3768/Stages/10274/Fixtures/International-FIFA-World-Cup-2014');
        $driver->get('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
        $pageSource = $driver->getPageSource();
        if (!$fileName) {
            $fileName = 'whoscored.com.2018.html';
        }

        file_put_contents($fileName, $pageSource);
        $driver->quit();
    }

    public function actionParse($fileName = null)
    {
        // Game::deleteAll();
        $dom = new \domDocument;
        libxml_use_internal_errors(true);
        if (!$fileName) {
            $fileName = 'whoscored.com.2018.html';
        }
        $dom->loadHTML(file_get_contents($fileName));
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
                    if (stripos($child2->getAttribute('class'), 'status') !== false) {
                        $status = $child2->nodeValue;
                    }
                }
            }
            $date = date('Y-m-d', strtotime($date));
            $time = date('H:i:s', strtotime($time));

            // Converting match day time to local time.
            $dateTime = new \DateTime($date.' '.$time, new \DateTimeZone('Europe/London'));
            $dateTime->setTimeZone(new \DateTimeZone('America/Tegucigalpa'));
            $finalDateTime = $dateTime->format('Y-m-d H:i:s');

            date_default_timezone_set('America/Tegucigalpa');
            if ($status == 'FT') {
                $finalStatus = Game::STATUS_PLAYED;
            } elseif(time() > strtotime($finalDateTime)) {
                $finalStatus = Game::STATUS_PLAYING;
            } else {
                $finalStatus = Game::STATUS_TO_BE_PLAYED;
            }

            $game = Game::find()->where(['date' => $finalDateTime, 'local_team' => $homeTeam, 'away_team' => $awayTeam])->one();
            if (!$game) {
                $game = new Game([
                    'date' => $finalDateTime,
                    'local_team' => $homeTeam,
                    'away_team' => $awayTeam,
                ]);
            }

            $game->result = $result == 'vs' ? null : $result;
            $game->status = $finalStatus;

            if (!$game->save()) {
                throw new Exception($game->errors);
            }
        }
    }

    public function actionFixTimes()
    {
        $games = Game::find()->all();
        foreach ($games as $game) {
            if (in_array($game->id, [65, 66, 67, 68])) {
                continue;
            }

            $dateTime = new \DateTime($game->date, new \DateTimeZone('Europe/London'));
            $dateTime->setTimeZone(new \DateTimeZone('America/Tegucigalpa'));
            $game->date = $dateTime->format('Y-m-d H:i:s');
            $game->update(false, ['date']);
        }
    }
}
