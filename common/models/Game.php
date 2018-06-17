<?php

namespace common\models;

use Yii;
use yii\behaviors\TimestampBehavior;

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

    public function init()
    {
        parent::init();
        $this->on(self::EVENT_BEFORE_UPDATE, [$this, 'betWon']);
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'updated_at',
                'value' => function () {
                    return date('Y-m-d H:i:s');
                },
            ]
        ];
    }

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
            [['date', 'created_at', 'updated_at', 'match_minute'], 'safe'],
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

    public function getBets()
    {
        return $this->hasMany(Bet::className(), ['game_id' => 'id']);
    }

    public function betWon()
    {
        // If true means that the game just finished.
        if (
            $this->getOldAttribute('status') != self::STATUS_PLAYED && 
            $this->getAttribute('status') == self::STATUS_PLAYED
        ) {
            if ($this->result) {
                list($localResult, $awayResult) = explode(':', $this->result);
                $betIds = $this->getBets()->select('id')->column();
                // If either local won by result or by penalties. Penalties won have asterisks in result.
                if ($localResult > $awayResult || strpos($localResult, '*') !== false) {
                    Bet::updateAll(['asserted' => 1],
                        [
                            'id' => $betIds,
                            'bet_for_local' => 1
                        ]
                    );
                } elseif ($localResult < $awayResult || strpos($awayResult, '*') !== false) {
                    Bet::updateAll(['asserted' => 1],
                        [
                            'id' => $betIds,
                            'bet_for_away' => 1
                        ]
                    );
                } else {
                    Bet::updateAll(['asserted' => 1],
                        [
                            'id' => $betIds,
                            'bet_for_draw' => 1
                        ]
                    );
                }

                ScoreBoard::updateBoard();
            }
        }
    }

    public function getHasMatchStarted()
    {
        date_default_timezone_set('America/Tegucigalpa');
        return time() > strtotime($this->date);
    }

    public function setPointsForUser($userId) 
    {
        $this->points = (int) (new Query())
            ->select('SUM(asserted)')
            ->from('bet')
            ->where(['user_id' => $user->id])
            ->scalar();
    }
}
