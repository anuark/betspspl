<?php

use yii\db\Migration;
use common\models\User;

/**
 * Class m180617_221336_table_scoreboard
 */
class m180617_221336_table_scoreboard extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('scoreboard', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'points' => $this->integer()->notNull().' DEFAULT 0',
            'pos' => $this->integer(). ' DEFAULT 0'
        ]);
        $this->addFOreignKey('fk_scoreboard_user', 'scoreboard', 'user_id', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->createTable('old_scoreboard', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'points' => $this->integer()->notNull().' DEFAULT 0',
            'pos' => $this->integer(). ' DEFAULT 0'
        ]);
        $this->addFOreignKey('fk_old_scoreboard_user', 'old_scoreboard', 'user_id', 'user', 'id', 'CASCADE', 'CASCADE');
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
        echo "m180617_221336_table_scoreboard cannot be reverted.\n";

        return false;
    }
    */
}
