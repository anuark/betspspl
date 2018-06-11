<?php

use yii\db\Migration;

/**
 * Class m180611_230637_table_game
 */
class m180611_230637_table_game extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('game', [
            'id' => $this->primaryKey(),
            'date' => $this->dateTime()->notNull(),
            'local_team' => $this->string(50),
            'away_team' => $this->string(50),
            'result' => $this->string(5),
            'status' => $this->string(50)
        ]);
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
        echo "m180611_230637_table_game cannot be reverted.\n";

        return false;
    }
    */
}
