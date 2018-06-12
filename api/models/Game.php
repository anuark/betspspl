<?php 

namespace api\models;

use Yii;

class Game extends \common\models\Game
{
    public $date2;

    public function fields()
    {
        $fields = parent::fields();
        $fields['date'] = function ($model) {
            return Yii::$app->formatter->asDate($model->date);
        };
        $fields['time'] = function ($model) {
            return Yii::$app->formatter->asTime($model->date);
        };
        return $fields;
    }
}
