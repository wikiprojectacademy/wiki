import { Validators } from '@angular/forms';

export const passwordValidation = Validators.pattern(
	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
);
