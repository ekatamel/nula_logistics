<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful as BaseEnsureFrontendRequestsAreStateful;

class EnsureFrontendRequestsAreStateful extends BaseEnsureFrontendRequestsAreStateful
{
    protected function getTokenFromRequest(Request $request)
    {
        return $request->cookie('auth') ?: $request->header('X-XSRF-TOKEN');
    }
}
