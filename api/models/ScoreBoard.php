<?php

namespace api\models;


class ScoreBoard extends \common\models\ScoreBoard
{
    public function fields()
    {
        $fields = parent::fields();
        unset($fields['id']);
        unset($fields['last_game_id']);
        $fields['username'] = function ($model) {
            return $model->user->username;
        };
        $fields['user_img'] = function ($model) {
            return $model->user->google_img_path;
        };
        return $fields;
    }
}