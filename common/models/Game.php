<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "game".
 *
 * @property int $id
 * @property string $date
 * @property string $local_team
 * @property string $away_team
 * @property string $result
 * @property string $status
 */
class Game extends \yii\db\ActiveRecord
{
    const STATUS_TO_BE_PLAYED = 'to be played';
    const STATUS_PLAYING = 'playing';
    const STATUS_PLAYED = 'played';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'game';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['date'], 'required'],
            [['date'], 'safe'],
            [['local_team', 'away_team', 'status'], 'string', 'max' => 50],
            ['status', 'in', 'range' => [self::STATUS_TO_BE_PLAYED, self::STATUS_PLAYING, self::STATUS_PLAYED]],
            [['result'], 'string', 'max' => 5],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'date' => 'Date',
            'local_team' => 'Local Team',
            'away_team' => 'Away Team',
            'result' => 'Result',
            'status' => 'Status',
        ];
    }
}
