<?php

use yii\db\Migration;

/**
 * Class m180611_215750_first_user
 */
class m180611_215750_first_user extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->insert('user', ['username' => 'Anuark', 'auth_key' => Yii::$app->security->generateRandomString(), 'password_hash' => Yii::$app->security->generatePasswordHash('asd123'), 'email' => 'arknium@gmail.com', 'created_at' => time(), 'updated_at' => time()]);
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
        echo "m180611_215750_first_user cannot be reverted.\n";

        return false;
    }
    */
}
