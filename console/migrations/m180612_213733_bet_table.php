<?php

use yii\db\Migration;

/**
 * Class m180612_213733_bet_table
 */
class m180612_213733_bet_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('bet', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'game_id' => $this->integer()->notNull(),
            'bet_for_local' => 'tinyint(1) DEFAULT 0',
            'bet_for_away' => 'tinyint(1) DEFAULT 0',
            'bet_for_draw' => 'tinyint(1) DEFAULT 0',
            'asserted' => 'tinyint(1) DEFAULT 0',
        ]);

        $this->addForeignKey('fk_bet_user', 'bet', 'user_id', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->addForeignKey('fk_bet_game', 'bet', 'game_id', 'game', 'id', 'CASCADE', 'CASCADE');
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
        echo "m180612_213733_bet_table cannot be reverted.\n";

        return false;
    }
    */
}
