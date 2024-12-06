import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

const alertVariants = {
  default: 'bg-blue-50 text-blue-700 border-blue-200',
  destructive: 'bg-red-50 text-red-700 border-red-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200'
};

const alertIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertCircle
};

const Alert = React.forwardRef(({ className = '', variant = 'default', children, ...props }, ref) => {
  const IconComponent = alertIcons[variant];
  
  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${alertVariants[variant]} ${className}`}
      {...props}
    >
      <div className="flex gap-3">
        {IconComponent && <IconComponent className="h-5 w-5" />}
        <div>{children}</div>
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({ className = '', ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm opacity-90 ${className}`}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };