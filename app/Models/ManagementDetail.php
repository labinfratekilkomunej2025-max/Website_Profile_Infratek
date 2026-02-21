<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManagementDetail extends Model
{
    protected $fillable = [
        'member_id',
        'position_id',
        'period_id',
    ];
    public $timestamps = false;
    public function member():BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
    public function period():BelongsTo
    {
        return $this->belongsTo(Period::class);
    }
    public function position():BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}
