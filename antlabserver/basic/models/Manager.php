<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
* 
*/
class Manager extends ActiveRecord
{

	public static function tableName(){
		return 'managers';
	}
}

?>