<?php

use yii\db\Migration;

/**
 * Class m180710_034834_is_extra_point_col
 */
class m180710_034834_is_extra_point_col extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('game', 'is_extra_point', 'tinyint(1) DEFAULT 0');
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
        echo "m180710_034834_is_extra_point_col cannot be reverted.\n";

        return false;
    }
    */
}
