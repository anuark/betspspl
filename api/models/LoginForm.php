<?php

namespace api\models;

use Yii;
use yii\base\Model;
use api\models\User;
use yii\web\BadRequestHttpException;

class LoginForm extends Model
{
    public $googleId;
    public $email;
    public $givenName;
    public $imageUrl;

    public function rules()
    {
        return [
            [['googleId', 'email', 'givenName', 'imageUrl'], 'safe']
        ];
    }

    public function getUser()
    {
        if ($this->googleId) {
            $user = User::find()->where(['email' => $this->email])->one();
            if (!$user) {
                $user = new User([
                    'email' => $this->email,
                    'username' => $this->givenName,
                ]);

                if (!$user->username) {
                    $user->username = 'temp';
                }
                $user->generateAuthKey();
                $user->generatePasswordResetToken();
                $user->password = "pass321";

                $user->save();
            }

            $user->google_img_path = $this->imageUrl;
            $user->update(false, ['google_img_path']);
        } else {
            throw new BadRequestHttpException("Auth only supports via google auth.");
        }

        return @$user;
    }
}