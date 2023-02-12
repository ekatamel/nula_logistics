<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            // Return error response
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Hash the password
        $hashedPassword = Hash::make($request->password);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword,
        ]);

        // Return success response
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }



    public function login(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            // Return error response
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Return error response
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        // Verify the password
        if (!Hash::check($request->password, $user->password)) {
            // Return error response
            return response()->json([
                'error' => 'Incorrect password'
            ], 400);
        }

        // Return success response
        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        // Remove the user from the session
        $request->session()->flush();

        // Return success response
        return response()->json([
            'message' => 'User logged out successfully'
        ], 200);
    }
}
