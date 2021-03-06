<?php

namespace Kirby\Panel;

use Exception;

/**
 * The Redirect exception can be thrown in all Fiber
 * routes to send a redirect response. It is
 * primarily used in `Panel::go($location)`
 *
 * @package   Kirby Panel
 * @author    Bastian Allgeier <bastian@getkirby.com>
 * @link      https://getkirby.com
 * @copyright Bastian Allgeier GmbH
 * @license   https://getkirby.com/license
 */
class Redirect extends Exception
{
    /**
     * Returns the HTTP code for the redirect
     *
     * @return int
     */
    public function code(): int
    {
        $codes = [301, 302, 303, 307, 308];

        if (in_array($this->getCode(), $codes) === true) {
            return $this->getCode();
        }

        return 302;
    }

    /**
     * Returns the URL for the redirect
     *
     * @return string
     */
    public function location(): string
    {
        return $this->getMessage();
    }
}
