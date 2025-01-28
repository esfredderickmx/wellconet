<?php

namespace App\Enums;

use ArchTech\Enums\Values;

enum FrontendNotificationType: string {
	use Values;

	case DEFAULT = 'default';
	case SUCCESS = 'success';
	case INFO = 'info';
	case WARNING = 'warning';
	case ERROR = 'error';
}
