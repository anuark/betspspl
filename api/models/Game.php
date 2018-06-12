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

        return $fields;
    }
}
