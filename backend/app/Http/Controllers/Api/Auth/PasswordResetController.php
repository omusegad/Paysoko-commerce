<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    /**
     * @OA\Post(
     * path="/forgot-password",
     *     summary="Send password reset link",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     * @OA\Property(property="email", type="string", format="email", example="omusegad@gmail.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reset link sent successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Reset link sent.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed to send reset link",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Failed to send reset link.")
     *         )
     *     )
     * )
     */
    public function sendResetLink(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($validated);

        return $status == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent.'], 200)
            : response()->json(['message' => 'Failed to send reset link.'], 400);
    }

    /**
     * @OA\Post(
     * path="/reset-password",
     *     summary="Reset user password",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"token", "email", "password", "password_confirmation"},
     *             @OA\Property(property="token", type="string", example="reset-token-example"),
     *             @OA\Property(property="email", type="string", format="email", example="omusegad@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="newpassword123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="newpassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Password successfully reset.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed to reset password",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Failed to reset password.")
     *         )
     *     )
     * )
     */
    public function reset(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset($validated, function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        });

        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password successfully reset.'], 200)
            : response()->json(['message' => 'Failed to reset password.'], 400);
    }
}
