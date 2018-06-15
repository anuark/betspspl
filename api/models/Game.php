<?php 

namespace api\models;

use Yii;

class Game extends \common\models\Game
{
    public $date2;
    public $has_bet;
    public $asserted;
    public $bet_for_local;
    public $bet_for_away;
    public $bet_for_draw;

    const esTeamNames = [
        'Argentina' => 'Argentina',
        'Australia' => 'Australia',
        'Belgium' => 'Bélgica',
        'Brazil' => 'Brasil',
        'Colombia' => 'Colombia',
        'Costa Rica' => 'Costa Rica',
        'Croatia' => 'Croacia',
        'Denmark' => 'Dinamarca',
        'Egypt' => 'Egipto',
        'England' => 'Inglaterra',
        'France' => 'Francia',
        'Germany' => 'Alemania',
        'Iceland' => 'Islandia',
        'Iran' => 'Irán',
        'Japan' => 'Japón',
        'Mexico' => 'México',
        'Morocco' => 'Marruecos',
        'Nigeria' => 'Nigeria',
        'Panama' => 'Panama',
        'Peru' => 'Peru',
        'Poland' => 'Polonia',
        'Portugal' => 'Portugal',
        'Russia' => 'Rusia',
        'Saudi Arabia' => 'Arabia Saudita',
        'Senegal' => 'Senegal',
        'Serbia' => 'Serbia',
        'South Korea' => 'Corea del Sur',
        'Spain' => 'España',
        'Sweden' => 'Suecia',
        'Switzerland' => 'Suiza',
        'Tunisia' => 'Túnez',
        'Uruguay' => 'Uruguay',
    ];

    public function fields()
    {
        $fields = parent::fields();
        $fields['date'] = function ($model) {
            return Yii::$app->formatter->asDate($model->date);
        };
        $fields['time'] = function ($model) {
            return Yii::$app->formatter->asTime($model->date);
        };
        $fields['has_bet'] = function($model) {
            return $model->has_bet;
        };
        $fields['asserted'] = function($model) {
            return $model->asserted;
        };
        $fields['bet_for_away'] = function($model) {
            return $model->bet_for_away;
        };
        $fields['bet_for_local'] = function($model) {
            return $model->bet_for_local;
        };
        $fields['bet_for_draw'] = function($model) {
            return $model->bet_for_draw;
        };
        $fields['local_team_es'] = function ($model) {
            return self::esTeamNames[$model->local_team];
        };
        $fields['away_team_es'] = function ($model) {
            return self::esTeamNames[$model->away_team];
        };

        return $fields;
    }
}
