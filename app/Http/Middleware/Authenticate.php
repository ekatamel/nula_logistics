<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    /**
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {

        if (!$request->expectsJson()) {
            return route('login');
        }
    }

    // public function handle($request, Closure $next, ...$guards)
    // {
    //     if ($jwt = $request->cookie('jwt')) {
    //         $request->headers->set('Authorization', 'Bearer' . $jwt);
    //     }

    //     $this->authenticate($request, $guards);

    //     return $next($request);
    // }
}
