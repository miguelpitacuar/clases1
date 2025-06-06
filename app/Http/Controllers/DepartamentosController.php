<?php

namespace App\Http\Controllers;

use App\Models\Departamentos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartamentosController extends Controller
{
    
    public function index()
    {
        $departamentos=Departamentos::all();
        return response()->json($departamentos);
    }

   
    public function store(Request $request)
    {
        //validar los campos que se envian al servidor
        $campos=['nombre'=>'required|string|min:1|max:100'];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validación de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);
        }
        $departamentos=new Departamentos($request->input());
        $departamentos->save();
        return response()->json([
            'status'=>true,
            'message'=>'Departamento creado satisfactoriamente'
        ],200);
    }

   
    public function show($id)
    {
        $departamento = Departamentos::find($id);
        return response()->json(['status'=>true,'data'=>$departamento]);
    }

    
    public function update(Request $request, $id)
    {
        $departamento = Departamentos::find($id);
        //validar los campos que se envian al servidor
        $campos=['nombre'=>'required|string|min:1|max:100'];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validación de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);
        }
        $departamento->update($request->input());
        return response()->json([
            'status'=>true,
            'message'=>'Departamento actualizado satisfactoriamente'
        ],200);
    }

    
    public function destroy($id)
    {
        $departamento = Departamentos::find($id);
        if (!$departamento) {
            return response()->json([
                'status' => false,
                'message' => 'Departamento no encontrado'
            ], 404);
        }
        $departamento->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Departamento eliminado satisfactoriamente'
        ],200);
    }
}