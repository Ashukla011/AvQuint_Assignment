import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { validateEmail, validatePassword } from '../utils/constants';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg-auth flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-20 w-64 h-64 bg-indigo-400/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-lg animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Start focusing on<br />
            <span className="text-brand-300">what matters</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            A minimal, elegant todo app designed to help you focus on what matters.
            Track tasks, manage time, and stay productive.
          </p>
          <div className="space-y-4">
            {[
              'Smart task management by priority & category',
              'Clean, distraction-free interface',
              'Track progress and celebrate wins',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="text-xl font-bold text-white">FocusFlow</span>
          </div>

          <div className="glass-card rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="text-gray-500 mt-1 text-sm">Free forever.</p>
            </div>

            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />

              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  validate: (v) => validateEmail(v) || 'Enter a valid email address',
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  validate: (v) =>
                    validatePassword(v) ||
                    'Password needs 8+ chars, 1 uppercase letter, and 1 number',
                })}
              />

              <Input
                label="Confirm password"
                type="password"
                placeholder="Repeat your password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
              />

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
