<?php

use yii\db\Migration;

/**
 * Class m180616_164503_created_at_cols
 */
class m180616_164503_created_at_cols extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('game', 'created_at', $this->dateTime());
        $this->addColumn('game', 'updated_at', $this->dateTime());
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
        echo "m180616_164503_created_at_cols cannot be reverted.\n";

        return false;
    }
    */
}
