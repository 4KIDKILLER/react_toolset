import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Checkbox,
  Divider,
  Footer,
  Icon,
  Typewriter,
} from 'animal-island-ui';
import { useAuth } from '@/contexts';
import SafeArea from '@/components/SafeArea';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState<Array<string | number>>(['remember']);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码哦~');
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || '登录失败');
    }
  };

  return (
    <SafeArea className="relative min-h-dvh flex flex-col items-center justify-between overflow-hidden bg-linear-to-b from-[#b9e3f0] via-[#cdeac4] to-[#f3e7c4] bg-lime-100">
      <main className="z-10 w-full max-w-[460px] px-5 pt-8 sm:pt-16">
        <div className="mb-6 text-center">
          <div className="mb-2 text-[56px] leading-none drop-shadow-[0_6px_0_rgba(114,93,66,0.18)]">
            🏝️
          </div>
          <Typewriter speed={70}>
            <h1 className="m-0 text-[28px] tracking-[1px] text-[#725d42]">
              欢迎回到无人岛
            </h1>
          </Typewriter>
          <p className="mt-1.5 text-sm text-[#9a835a]">岛民登录通行证</p>
        </div>

        <Card color="default">
          <div className="px-1 py-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-[18px]">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-[#725d42]"
                >
                  岛民名字
                </label>
                <Input
                  id="username"
                  size="large"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入你的岛民名字"
                  prefix={<Icon name="icon-chat" size={20} />}
                  allowClear
                  onClear={() => setUsername('')}
                  disabled={isLoading}
                  status={error ? 'error' : undefined}
                />
              </div>

              <div className="mb-[18px]">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#725d42]"
                >
                  通行口令
                </label>
                <Input
                  id="password"
                  size="large"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入通行口令"
                  prefix={<Icon name="icon-miles" size={20} />}
                  disabled={isLoading}
                  status={error ? 'error' : undefined}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <Checkbox
                  size="small"
                  value={remember}
                  onChange={setRemember}
                  options={[{ label: '下次自动登岛', value: 'remember' }]}
                />
                <Button type="link" size="small">
                  忘记口令?
                </Button>
              </div>

              <Divider type="wave-yellow" />

              {error && (
                <div className="mt-3.5 mb-1 rounded-2xl border-2 border-dashed border-[#fc736d] bg-[#fde2e0] px-3.5 py-2.5 text-center text-[13px] text-[#b53a3a]">
                  ⚠️ {error}
                </div>
              )}

              <div className="mt-[18px]">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoading}
                  icon={<Icon name="icon-helicopter" size={20} />}
                >
                  {isLoading ? '登岛中…' : '出发去岛上'}
                </Button>
              </div>

              <div className="mt-3">
                <Button type="dashed" size="large" block>
                  我是新岛民,创建通行证
                </Button>
              </div>
            </form>

            <div className="mt-[18px] rounded-xl bg-[#f7cd67]/35 px-3 py-2.5 text-center text-xs text-[#725d42]">
              🐾 测试账号：<strong>admin</strong> / 口令：<strong>admin123</strong>
            </div>
          </div>
        </Card>
      </main>

      <Footer type="tree" className="z-0 w-full" />
    </SafeArea>
  );
};

export default Login;
