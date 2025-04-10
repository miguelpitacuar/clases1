<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trabajadores extends Model
{
    use HasFactory;

    // Definir los campos que pueden ser asignados masivamente
    protected $fillable = [
        'nombre', 'apellido', 'correo', 'telefono', 'direccion', 'id_departamento'
    ];

    // Si tus campos de fechas no son 'created_at' y 'updated_at', puedes definirlos aquí
    // Si no, Laravel se encargará de ellos automáticamente
    // protected $dates = ['created_at', 'updated_at'];

    // Si no estás utilizando las fechas de creación y actualización automáticas de Laravel, puedes desactivar los timestamps
    // Si tienes otros nombres para las fechas de creación o actualización, puedes configurarlos así:
    // public $timestamps = false; 
    // Si deseas usar fechas personalizadas, desactiva los timestamps y maneja las fechas manualmente.

    // Si necesitas manipular alguna relación, por ejemplo, con el modelo de `Departamentos`
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'id_departamento');
    }
}
