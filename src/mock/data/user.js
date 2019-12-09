import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    // name: Mock.Random.cname(),
    'name|1': ['不朽','被窝是青春的坟墓','萤窗小语','我与地坛','平凡的世界','废都'],
    addr: Mock.mock('@county(true)'),
    'resNum|1-10': 1,
    inLibDate: Mock.Random.date(),
    ctg: Mock.Random.integer(0, 4)
  }));
}

export { LoginUsers, Users };
////通过向大括号中添加LoginUsers, Users ，变量并且export输出，就可以将对应变量值以LoginUsers, Users 变量标识符形式暴露给其他文件而被读取到
