<?php

namespace common\models;

use Yii;
use yii\db\Query;

/**
 * This is the model class for table "scoreboard".
 *
 * @property int $id
 * @property int $user_id
 * @property int $points
 * @property int $pos
 *
 * @property User $user
 */
class ScoreBoard extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'scoreboard';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id'], 'required'],
            [['user_id', 'points', 'pos', 'last_game_id'], 'integer'],
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
            'points' => 'Points',
            'pos' => 'Pos',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLastGame()
    {
        return $this->hasOne(Game::className(), ['id' => 'last_game_id']);
    }

    public static function moveDataToOldTable()
    {
        Yii::$app->db->createCommand("DELETE FROM old_scoreboard")->execute();
        Yii::$app->db->createCommand("INSERT INTO old_scoreboard SELECT * FROM scoreboard")->execute();
    }

    public function setPointsToUser()
    {
        $this->points = (int) (new Query())
            ->select('SUM(asserted)')
            ->from('bet')
            ->where(['user_id' => $this->user_id])
            // ->andFilterWhere(['<=', 'game_id', $this->last_game_id])
            ->scalar();
    }

    public static function updateBoard()
    {
        self::moveDataToOldTable();

        $lastGameId = (new Query())->select('id')->from('game')->orderBy('id DESC')->limit(1)->scalar();
        foreach  (User::find()->all() as $user) {
            // Only allow users that actually betted.
            if (!in_array($user->id, [3,4,5,6,7,8,9,10])) {
                continue;
            }

            $scoreboard = self::findOne(['user_id' => $user->id]);
            if (!$scoreboard) {
                $scoreboard = new static([
                    'user_id' => $user->id,
                ]);
            }

            $scoreboard->last_game_id = $lastGameId;
            $scoreboard->setPointsToUser();
            $scoreboard->save();
        }

        // Update new position in table.
        $oldPos = (new Query())
            ->select('user_id')
            ->from('old_scoreboard')
            ->orderBY('points DESC')
            ->column();

        $scoreboards = self::find()->orderBy('points DESC')->all();

        foreach ($scoreboards as $newPos => $scoreboard) {
            foreach ($oldPos as $pos => $userId) {
                if ($scoreboard->user_id == $userId) {
                    $scoreboard->pos = $pos - $newPos;
                    $scoreboard->update(false, ['pos']);
                }
            }
        }
    }
}
