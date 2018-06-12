<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "bet".
 *
 * @property int $id
 * @property int $user_id
 * @property int $game_id
 * @property int $bet_for_local
 * @property int $bet_for_away
 * @property int $bet_for_draw
 * @property int $asserted
 *
 * @property Game $game
 * @property User $user
 */
class Bet extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'bet';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'game_id'], 'required'],
            [['user_id', 'game_id', 'bet_for_local', 'bet_for_away', 'bet_for_draw', 'asserted'], 'integer'],
            [['game_id'], 'exist', 'skipOnError' => true, 'targetClass' => Game::className(), 'targetAttribute' => ['game_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'game_id' => 'Game ID',
            'bet_for_local' => 'Bet For Local',
            'bet_for_away' => 'Bet For Away',
            'bet_for_draw' => 'Bet For Draw',
            'asserted' => 'Asserted',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGame()
    {
        return $this->hasOne(Game::className(), ['id' => 'game_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
