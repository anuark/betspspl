<?php
Yii::setAlias('@common', dirname(__DIR__));
Yii::setAlias('@frontend', dirname(dirname(__DIR__)) . '/frontend');
Yii::setAlias('@backend', dirname(dirname(__DIR__)) . '/backend');
Yii::setAlias('@console', dirname(dirname(__DIR__)) . '/console');
Yii::setAlias('@api', dirname(dirname(__DIR__)) . '/api');

/**
 * Gets the error message of a model.
 * @param  yii\base\Model $model 
 * @return string|null        
 */
function getError($model) {
    if (is_array($model)) {
        foreach ($model as $mod) {
            if ($mod->hasErrors()) {
                return array_values($mod->firstErrors)[0];
            }
        }
    } else {
        if ($model->hasErrors()) {
            return array_values($model->firstErrors)[0];
        }
    }
    
    return null;
}

function dd() {
    if (YII_DEBUG) {
        foreach (func_get_args() as $arg) {
            var_dump($arg);
        }
        die;
        // Yii::$app->end();
    }
}
