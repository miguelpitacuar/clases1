<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamentos extends Model
{
    /** @use HasFactory<\Database\Factories\DepartamentFactory> */
    use HasFactory;
    protected $fillable=['nombre'];
}
