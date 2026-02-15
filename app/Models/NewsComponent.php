<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\NewsCompType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NewsComponent extends Model
{
    protected $fillable = [
        'news_id',
        'type',
        'text_content',
        'image_path',
        'order',
        'created_by_id',
        'alt_text',
    ];
    protected $casts = [
        'type' => NewsCompType::class,
    ];
    public function news():BelongsTo
    {
        return $this->belongsTo(News::class);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
