<?php

namespace App\Enums;

use ArchTech\Enums\Values;

enum FrontendMessageType: string {
	use Values;
	
	case DEFAULT = 'default';
	case DESTRUCTIVE = 'destructive';
}
