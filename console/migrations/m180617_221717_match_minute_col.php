<?php

use yii\db\Migration;

/**
 * Class m180617_221717_match_minute_col
 */
class m180617_221717_match_minute_col extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('game', 'match_minute', $this->string(5));
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
        echo "m180617_221717_match_minute_col cannot be reverted.\n";

        return false;
    }
    */
}
