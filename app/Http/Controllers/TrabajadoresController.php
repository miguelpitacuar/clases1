<?php

namespace App\Http\Controllers;

use App\Models\Trabajadores;
use App\Models\Departamento;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TrabajadoresController extends Controller
{
    /**
     * Constructor vacío para evitar autenticación automática.
     */
    public function __construct()
    {
        // No se requiere autenticación
    }

    /**
     * Mostrar todos los trabajadores con su departamento.
     */
    public function index()
    {
        // Obtener todos los trabajadores con el nombre del departamento
        $trabajadores = Trabajadores::select('trabajadores.*', 'departamentos.nombre as departamento')
            ->join('departamentos', 'departamentos.id', '=', 'trabajadores.id_departamento')
            ->paginate(10); // Paginación de 10 trabajadores por página

        return response()->json($trabajadores);
    }

    /**
     * Almacenar un nuevo trabajador.
     */
    public function store(Request $request)
    {
        // Validación de los campos
        $campos = [
            'nombre' => 'required|string|min:1|max:100',
            'apellido' => 'required|string|min:1|max:100',
            'correo' => 'required|email|max:80',
            'telefono' => 'required|max:15',
            'direccion' => 'nullable|string|max:255',
            'id_departamento' => 'required|numeric|exists:departamentos,id', // Validar que el id del departamento exista
        ];

        // Aplicar la validación
        $validador = Validator::make($request->all(), $campos);

        // Si la validación falla, retornamos los errores
        if ($validador->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validador->errors()->all()
            ], 400); // Bad Request
        }

        // Crear el trabajador en la base de datos
        $trabajadores = Trabajadores::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'direccion' => $request->direccion, // Campo opcional
            'id_departamento' => $request->id_departamento,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Trabajador creado satisfactoriamente',
            'trabajador' => $trabajadores
        ], 201); // Respuesta con código 201 para creación exitosa
    }

    /**
     * Mostrar un trabajador específico.
     */
    public function show($id)
    {
        // Buscar un trabajador por su ID
        $trabajador = Trabajadores::find($id);

        if (!$trabajador) {
            return response()->json([
                'status' => false,
                'message' => 'Trabajador no encontrado'
            ], 404); // Not Found
        }

        return response()->json([
            'status' => true,
            'data' => $trabajador
        ]);
    }

    /**
     * Actualizar la información de un trabajador.
     */
    public function update(Request $request, $id)
    {
        // Validación de los campos
        $campos = [
            'nombre' => 'required|string|min:1|max:100',
            'apellido' => 'required|string|min:1|max:100',
            'correo' => 'required|email|max:80',
            'telefono' => 'required|max:15',
            'direccion' => 'nullable|string|max:255',
            'id_departamento' => 'required|numeric|exists:departamentos,id', // Validar que el id del departamento exista
        ];

        // Aplicar la validación
        $validador = Validator::make($request->all(), $campos);

        // Si la validación falla, retornamos los errores
        if ($validador->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validador->errors()->all()
            ], 400); // Bad Request
        }

        // Buscar el trabajador por su ID
        $trabajadores = Trabajadores::find($id);

        if (!$trabajadores) {
            return response()->json([
                'status' => false,
                'message' => 'Trabajador no encontrado'
            ], 404); // Not Found
        }

        // Actualizar los datos del trabajador
        $trabajadores->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Trabajador actualizado satisfactoriamente',
            'trabajador' => $trabajadores
        ], 200); // OK
    }

    /**
     * Eliminar un trabajador.
     */
    public function destroy($id)
    {
        // Buscar el trabajador por su ID
        $trabajadores = Trabajadores::find($id);

        if (!$trabajadores) {
            return response()->json([
                'status' => false,
                'message' => 'Trabajador no encontrado'
            ], 404); // Not Found
        }

        // Eliminar el trabajador
        $trabajadores->delete();

        return response()->json([
            'status' => true,
            'message' => 'Trabajador eliminado satisfactoriamente'
        ], 200); // OK
    }

    /**
     * Obtener el número de trabajadores por departamento.
     */
    public function TrabajadoresDepartamento()
    {
        // Obtener el número de trabajadores por departamento
        $trabajadores = Trabajadores::select(DB::raw('count(id_departamento) as conteo'), 'departamentos.nombre as departamento')
            ->join('departamentos', 'departamentos.id', '=', 'trabajadores.id_departamento')
            ->groupBy('departamentos.nombre')
            ->get();

        return response()->json($trabajadores);
    }

    /**
     * Obtener todos los trabajadores con sus respectivos departamentos.
     */
    public function all()
    {
        // Obtener todos los trabajadores con su respectivo departamento
        $trabajadores = Trabajadores::select('trabajadores.*', 'departamentos.nombre as departamento')
            ->join('departamentos', 'departamentos.id', '=', 'trabajadores.id_departamento')
            ->get();

        return response()->json($trabajadores);
    }
}
