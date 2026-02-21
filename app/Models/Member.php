<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    protected $fillable = [
        'full_name',
        'linkedin_link',
        'photo_path',
        'created_at',
        'edited_at',
    ];
    public $timestamps = false;
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function management_detail():HasMany
    {
        return $this->hasMany(ManagementDetail::class);
    }
}
