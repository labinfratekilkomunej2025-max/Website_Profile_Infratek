<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Period extends Model
{
    protected $fillable = [
        'title',
    ];
    public $timestamps = false;
    public function management_details():HasMany{
        return $this->hasMany(ManagementDetail::class);
    }
}
