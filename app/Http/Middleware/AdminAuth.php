<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Log;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        Log::info($user);
        if (!$user) {
            return redirect('/login')->withError('Silakan login terlebih dahulu');
        }
        if (!$user->is_admin){
            return abort(403, 'You do not have permission to access this resource.');
        }
        return $next($request);
    }
}
