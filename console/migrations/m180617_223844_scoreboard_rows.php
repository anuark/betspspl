<?php

use yii\db\{Migration, Query};
use common\models\{User, ScoreBoard};

/**
 * Class m180617_223844_scoreboard_rows
 */
class m180617_223844_scoreboard_rows extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('scoreboard', 'last_game_id', $this->integer());
        $this->addForeignKey('fk_scoreboard_last_game', 'scoreboard', 'last_game_id', 'game', 'id', 'SET NULL', 'CASCADE');
        $this->addColumn('old_scoreboard', 'last_game_id', $this->integer());
        $this->addForeignKey('fk_old_scoreboard_last_game', 'old_scoreboard', 'last_game_id', 'game', 'id', 'SET NULL', 'CASCADE');
        foreach (User::find()->all() as $user) {
            if (in_array($user->id, [1,12,2])) {
                continue;
            }

            $scoreboard = new ScoreBoard([
                'user_id' => $user->id
            ]);
            $scoreboard->setPointsToUser();
            $scoreboard->save();
        }

        ScoreBoard::moveDataToOldTable();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {

    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180617_223844_scoreboard_rows cannot be reverted.\n";

        return false;
    }
    */
}
