<?php

use yii\db\Migration;

/**
 * Class m180612_210723_user_fields
 */
class m180612_210723_user_fields extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'google_img_path', $this->string());
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
        echo "m180612_210723_user_fields cannot be reverted.\n";

        return false;
    }
    */
}
