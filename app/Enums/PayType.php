<?php

declare(strict_types=1);

namespace App\Enums;

enum PayType: string
{
    case HOURLY = 'hourly';

    case SALARY = 'salary';

    /**
     * @return string[]
     */
    public static function toArray(): array
    {
        return [
            self::HOURLY->value,
            self::SALARY->value,
        ];
    }
}
