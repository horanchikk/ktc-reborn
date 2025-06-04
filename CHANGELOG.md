# [0.2.0-dev.2](https://github.com/horanchikk/ktc-reborn/compare/v0.2.0-dev.1...v0.2.0-dev.2) (2025-06-04)


### Bug Fixes

* **api:** удален ненужный экземпляр snackbar из класса API и исправлено использование snackbar в методе throwError ([45f924c](https://github.com/horanchikk/ktc-reborn/commit/45f924ced3bee9b6dba391ef1c08432795e01f83))
* **markup:** заменен метод перенаправления на использование window.location.href вместо router.push ([47de994](https://github.com/horanchikk/ktc-reborn/commit/47de994f55f9872e152565b9e95cf2dc0f249390))
* **markup:** исправлен баг с двойным проскроллом новости ([32df2f2](https://github.com/horanchikk/ktc-reborn/commit/32df2f247223a33a64c49811e1e0bd6916caed3c))
* **markup:** увеличено время отображения splash-экрана и добавлены параметры для отображения спиннера ([b3ce272](https://github.com/horanchikk/ktc-reborn/commit/b3ce272cf9ea67d21c3d352b782fb7a3bff37555))


### Features

* **markup:** исправлена работа цветов navigationbar и backgroundcolor при открытии дополнительных пунктов ([1c1be86](https://github.com/horanchikk/ktc-reborn/commit/1c1be8606cf4b32422385038f391243c3136d3f1))
* **markup:** увеличена высота блоков в разделе "новости" ([765f012](https://github.com/horanchikk/ktc-reborn/commit/765f01253ea8d139af6a9b5a43f72fffbccc1a6a))
* **optimize:** оптимизация рендеринга на странице блога и расписания; добавлен лоадер, если загрузка страницы требует много ресурсов ([0bf97d5](https://github.com/horanchikk/ktc-reborn/commit/0bf97d58e1a3727d225550e34534a3ab66073e13))
* **page:** добавлен раздел "Контакты" ([9dbef25](https://github.com/horanchikk/ktc-reborn/commit/9dbef256c8e5158b103f37d9236e3c2cf3a8ba1f))

# [0.2.0-dev.1](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0...v0.2.0-dev.1) (2025-06-03)


### Bug Fixes

* **about:** обновлено отображение версии приложения ([e66f1ef](https://github.com/horanchikk/ktc-reborn/commit/e66f1efa6aea9bcb7c4ef118b93554c8b43cd17e)), closes [#22](https://github.com/horanchikk/ktc-reborn/issues/22)
* **about:** обновлено отображение версии приложения с использованием переменной APP_VERSION ([1041b6b](https://github.com/horanchikk/ktc-reborn/commit/1041b6babf07ec69164667afe765297b41d3bfc3))
* **api:** добавлено исключение для 422 кодов ([7fd55ec](https://github.com/horanchikk/ktc-reborn/commit/7fd55ecf8857673e266703f16c1869d1e4ffff95))
* **api:** добавлено логирование обновления токена доступа и перезапрос с новым токеном ([2ab7290](https://github.com/horanchikk/ktc-reborn/commit/2ab72909f68c086f94d5ed62dd4d31784e98702f))
* **api:** добавлено уведомление об ошибке на сервере с использованием компонента Snackbar ([b33aff9](https://github.com/horanchikk/ktc-reborn/commit/b33aff97309bb7ae5342d62ed5b79524c16f7310))
* **api:** исправлено логирование ошибок, добавлены дополнительные параметры для функции throwError ([4449a63](https://github.com/horanchikk/ktc-reborn/commit/4449a63aaa12e29bf66c20d90ea262a7fe347033))
* **auditories:** удалено сообщение о отсутствии кабинетов при наличии свободных аудиторий ([5145a05](https://github.com/horanchikk/ktc-reborn/commit/5145a05c7d2f8ff9002109ef511560098a03235a))
* **autodeploy:** восстановлено выполнение публикации релиза с использованием semantic-release ([da65663](https://github.com/horanchikk/ktc-reborn/commit/da65663f610822d7f0bc1b935bfe31be96303c4f))
* **ci:** api_url из vars ([d04433c](https://github.com/horanchikk/ktc-reborn/commit/d04433c4cc3c6b9580797c44c234dfdc4a626d08))
* **ci:** изменено название переменной api ([1b53ea9](https://github.com/horanchikk/ktc-reborn/commit/1b53ea9be55329a99da6945154cf9f58cb5a611c))
* **ci:** исправлена работа actions/upload-artifact ([509df6a](https://github.com/horanchikk/ktc-reborn/commit/509df6abdeaddd13d4bf185b9985c40d8bbdbd10))
* **ci:** исправлена табуляция ([a81e103](https://github.com/horanchikk/ktc-reborn/commit/a81e103dce7e3eea66646bc10e6243ce862e7d98))
* **ci:** обновление конфига артефактов ([223395f](https://github.com/horanchikk/ktc-reborn/commit/223395f409c211eea6a5bf3565958fc6d9724305))
* **ci:** отключено сжатие файла ([24b7867](https://github.com/horanchikk/ktc-reborn/commit/24b7867e0587fd9dbaa40e49b70f5c5df5c8632d))
* **ci:** пишем url api напрямую ([917fea9](https://github.com/horanchikk/ktc-reborn/commit/917fea98822f47b8e05af1e2b2e12f6a7b768a33))
* **ci:** фикс semantic-release ([a96c4ac](https://github.com/horanchikk/ktc-reborn/commit/a96c4ac3fc06a35af57f58a87d8c5fa3e81f159c))
* **group.vue:** изменен тип параметра функции setGroup на интерфейс Group для улучшения типизации ([73c48e1](https://github.com/horanchikk/ktc-reborn/commit/73c48e153bc3f9eaa3bb7d469b69346fbb665790))
* **markup:** исправлен баг с ошибкой при загрузке ([8965a9f](https://github.com/horanchikk/ktc-reborn/commit/8965a9fc83b14a8d5e60cd96f959adc29701b815))
* **markup:** исправлена ссылка на редирект из страницы ошибки ([f7f85d0](https://github.com/horanchikk/ktc-reborn/commit/f7f85d02c162b4b82acb6bdbe1e9e9d26f00455c))
* **markup:** исправления для расписания преподавателей ([2628fe8](https://github.com/horanchikk/ktc-reborn/commit/2628fe865ef0511a45290eb746e9bbd7671023ae))
* **modules:** удалён nuxt модуль eslint ([d5c7a1d](https://github.com/horanchikk/ktc-reborn/commit/d5c7a1dec277cce7d606896a376e7a52f61e7a29))
* **news:** исправлен путь к изображению по умолчанию для новостей ([3deab3f](https://github.com/horanchikk/ktc-reborn/commit/3deab3fb5051b7381f4989e9d53831d24cce8a64))
* **OTA.vue:** добавлена проверка наличия обновления с отображением сообщения о недоступности ссылки ([93bb5c2](https://github.com/horanchikk/ktc-reborn/commit/93bb5c2648178db4afcb367c99ecedf940a41031))
* **OTA.vue:** изменен тип UpdateInfo для улучшения типизации и улучшена проверка наличия обновлений ([2b89127](https://github.com/horanchikk/ktc-reborn/commit/2b891278b2f05dce5c526cc03e692022026c3b12))
* **OTA.vue:** улучшена проверка наличия обновлений и добавлены значения по умолчанию для отображения информации о версиях ([ec26da7](https://github.com/horanchikk/ktc-reborn/commit/ec26da7328fee4f45d9dab60e0b9b3693ff7302c))
* **Post.vue:** удален лишний класс из шаблона; обновлены параметры для динамического скроллера в news/index.vue ([896f6fa](https://github.com/horanchikk/ktc-reborn/commit/896f6faefbf030882e7d1eede712893d395c0044))
* **release.config:** обновлен путь к APK файлу с использованием версии следующего релиза; исправлены параметры в autodeploy.yml для загрузки артефакта ([21f1be4](https://github.com/horanchikk/ktc-reborn/commit/21f1be45a824d73232ecabc5dd5a1b1d5f15467c))
* **scripts:** исправлен скрипт для запуска на мобильных устройствах ([5f3fd82](https://github.com/horanchikk/ktc-reborn/commit/5f3fd8275b3979f3360fea12e943cb26d7759315))


### Features

* **api:** добавлены модули блога и новостей в api ([3f09b72](https://github.com/horanchikk/ktc-reborn/commit/3f09b72d6063c98be4a228adfe7aa3bf62d60d70))
* **api:** обновлена логика взаимодействия с API ([b3baa7e](https://github.com/horanchikk/ktc-reborn/commit/b3baa7e0153d69eb4fa361e76f51c116bb9e9512))
* **api:** распределены все запросы по модулям ([c3577d7](https://github.com/horanchikk/ktc-reborn/commit/c3577d7b842fa4e38ae50112cfab38e6257c8fcd))
* **app:** добавлены мета-теги для управления масштабированием; улучшена обработка ошибок и обновлений ([a873893](https://github.com/horanchikk/ktc-reborn/commit/a873893d1cc5123137a95886f5ef35222a03787f))
* **ci:** Update autodeploy.yml ([613287e](https://github.com/horanchikk/ktc-reborn/commit/613287e8af3ca2e11154bfb8300aab4c7052d47a))
* **CI:** Update autodeploy.yml ([c6a8cfc](https://github.com/horanchikk/ktc-reborn/commit/c6a8cfcf00d92ffcc83d6ce71506296b79024d2c))
* **ci:** добавлен gradle перед сборкой APK ([f49d6ee](https://github.com/horanchikk/ktc-reborn/commit/f49d6ee9a51a1064b2fc47410daa84689ec78f34))
* **ci:** добавлен вывод статуса .env ([b62b896](https://github.com/horanchikk/ktc-reborn/commit/b62b896404696217462870515201095a981dbe7d))
* **ci:** обновлен ci github ([4ae5d21](https://github.com/horanchikk/ktc-reborn/commit/4ae5d219c6f076f4d77538db6fbe0c53e317d601))
* **component:** добавлен компонент для OTA-обновлений ([7810db9](https://github.com/horanchikk/ktc-reborn/commit/7810db991656a7088103797ea8cfe83999496cfe))
* **config:** добавлена новая переменная в dotenv ([97f9863](https://github.com/horanchikk/ktc-reborn/commit/97f986306f6bb2363d15a0199b87cf64a554c356))
* **config:** обновлена версия java ([916210b](https://github.com/horanchikk/ktc-reborn/commit/916210bf95f797560d3f96c5046fe98e6f64baf6))
* **helpers:** добавлен хелпер для детекта ключей объекта ([ac078d2](https://github.com/horanchikk/ktc-reborn/commit/ac078d21db674caa483978a36aadbcf03dff60c5))
* **linting:** переход с eslint на oxlint 🚀 ([a61db7d](https://github.com/horanchikk/ktc-reborn/commit/a61db7d29f186bf0e66c84e208457c03c79b978f))
* **log:** обновили логгирование ([324299b](https://github.com/horanchikk/ktc-reborn/commit/324299be442525f51864e6184a04d24fc6f5f57e))
* **markup:** добавлен splash экран ([519231e](https://github.com/horanchikk/ktc-reborn/commit/519231ea40ea1de7c8ac3d97a7f80e7d767906bd))
* **markup:** добавлены иконки для GitHub, Telegram и VK; добавлен компонент PersonCard для отображения информации о пользователях на странице "О приложении" ([914e17a](https://github.com/horanchikk/ktc-reborn/commit/914e17ac346b8f911aef07aac7a864d0c1076aa0))
* **markup:** освежил верстку формы ([984d86e](https://github.com/horanchikk/ktc-reborn/commit/984d86e191dd5633e00b179887bad2197e681acb))
* **packages:** добавлен пакет @capacitor/browser для открытия ссылок ([515f757](https://github.com/horanchikk/ktc-reborn/commit/515f7574e729141433fe81e8c124bfa60dd8ea1b))
* **scripts:** обновлен скрипт; удалены лишние этапы ([b5885d6](https://github.com/horanchikk/ktc-reborn/commit/b5885d61b0df1dd4e685ad81d8cc7f6d87f26403))
* **scripts:** перенос apk в корень проекта ([8f7a332](https://github.com/horanchikk/ktc-reborn/commit/8f7a33200db4652b7c39e0825a626381cf492f7e))
* **sentry:** записываем ошибки в Sentry ([c0f0bd0](https://github.com/horanchikk/ktc-reborn/commit/c0f0bd080e970c49dd27298935f8226793c84adb))
* **snackbar:** добавлен компонент Snackbar для отображения уведомлений и интеграция в приложение ([c2b744f](https://github.com/horanchikk/ktc-reborn/commit/c2b744fa16348f8682a7697832c310dab5104bf4))
* **store:** добавлен стор для работы с настройками ([14ed234](https://github.com/horanchikk/ktc-reborn/commit/14ed234029b883db672318fd22d2906a50414f8d))
* добавлена логика работа OTA-обновлений ([c5c63b1](https://github.com/horanchikk/ktc-reborn/commit/c5c63b15b7d5a36f358451ce5191c675f8b10204))

# [0.1.0-dev.24](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.23...v0.1.0-dev.24) (2025-06-03)


### Bug Fixes

* **about:** обновлено отображение версии приложения ([e66f1ef](https://github.com/horanchikk/ktc-reborn/commit/e66f1efa6aea9bcb7c4ef118b93554c8b43cd17e)), closes [#22](https://github.com/horanchikk/ktc-reborn/issues/22)
* **about:** обновлено отображение версии приложения с использованием переменной APP_VERSION ([1041b6b](https://github.com/horanchikk/ktc-reborn/commit/1041b6babf07ec69164667afe765297b41d3bfc3))
* **api:** добавлено исключение для 422 кодов ([7fd55ec](https://github.com/horanchikk/ktc-reborn/commit/7fd55ecf8857673e266703f16c1869d1e4ffff95))
* **api:** добавлено логирование обновления токена доступа и перезапрос с новым токеном ([2ab7290](https://github.com/horanchikk/ktc-reborn/commit/2ab72909f68c086f94d5ed62dd4d31784e98702f))
* **api:** добавлено уведомление об ошибке на сервере с использованием компонента Snackbar ([b33aff9](https://github.com/horanchikk/ktc-reborn/commit/b33aff97309bb7ae5342d62ed5b79524c16f7310))
* **api:** исправлено логирование ошибок, добавлены дополнительные параметры для функции throwError ([4449a63](https://github.com/horanchikk/ktc-reborn/commit/4449a63aaa12e29bf66c20d90ea262a7fe347033))
* **auditories:** удалено сообщение о отсутствии кабинетов при наличии свободных аудиторий ([5145a05](https://github.com/horanchikk/ktc-reborn/commit/5145a05c7d2f8ff9002109ef511560098a03235a))
* **autodeploy:** восстановлено выполнение публикации релиза с использованием semantic-release ([da65663](https://github.com/horanchikk/ktc-reborn/commit/da65663f610822d7f0bc1b935bfe31be96303c4f))
* **ci:** api_url из vars ([d04433c](https://github.com/horanchikk/ktc-reborn/commit/d04433c4cc3c6b9580797c44c234dfdc4a626d08))
* **ci:** изменено название переменной api ([1b53ea9](https://github.com/horanchikk/ktc-reborn/commit/1b53ea9be55329a99da6945154cf9f58cb5a611c))
* **ci:** исправлена работа actions/upload-artifact ([509df6a](https://github.com/horanchikk/ktc-reborn/commit/509df6abdeaddd13d4bf185b9985c40d8bbdbd10))
* **ci:** исправлена табуляция ([a81e103](https://github.com/horanchikk/ktc-reborn/commit/a81e103dce7e3eea66646bc10e6243ce862e7d98))
* **ci:** обновление конфига артефактов ([223395f](https://github.com/horanchikk/ktc-reborn/commit/223395f409c211eea6a5bf3565958fc6d9724305))
* **ci:** отключено сжатие файла ([24b7867](https://github.com/horanchikk/ktc-reborn/commit/24b7867e0587fd9dbaa40e49b70f5c5df5c8632d))
* **ci:** пишем url api напрямую ([917fea9](https://github.com/horanchikk/ktc-reborn/commit/917fea98822f47b8e05af1e2b2e12f6a7b768a33))
* **ci:** фикс semantic-release ([a96c4ac](https://github.com/horanchikk/ktc-reborn/commit/a96c4ac3fc06a35af57f58a87d8c5fa3e81f159c))
* **group.vue:** изменен тип параметра функции setGroup на интерфейс Group для улучшения типизации ([73c48e1](https://github.com/horanchikk/ktc-reborn/commit/73c48e153bc3f9eaa3bb7d469b69346fbb665790))
* **markup:** исправлен баг с ошибкой при загрузке ([8965a9f](https://github.com/horanchikk/ktc-reborn/commit/8965a9fc83b14a8d5e60cd96f959adc29701b815))
* **news:** исправлен путь к изображению по умолчанию для новостей ([3deab3f](https://github.com/horanchikk/ktc-reborn/commit/3deab3fb5051b7381f4989e9d53831d24cce8a64))
* **OTA.vue:** добавлена проверка наличия обновления с отображением сообщения о недоступности ссылки ([93bb5c2](https://github.com/horanchikk/ktc-reborn/commit/93bb5c2648178db4afcb367c99ecedf940a41031))
* **OTA.vue:** изменен тип UpdateInfo для улучшения типизации и улучшена проверка наличия обновлений ([2b89127](https://github.com/horanchikk/ktc-reborn/commit/2b891278b2f05dce5c526cc03e692022026c3b12))
* **OTA.vue:** улучшена проверка наличия обновлений и добавлены значения по умолчанию для отображения информации о версиях ([ec26da7](https://github.com/horanchikk/ktc-reborn/commit/ec26da7328fee4f45d9dab60e0b9b3693ff7302c))
* **Post.vue:** удален лишний класс из шаблона; обновлены параметры для динамического скроллера в news/index.vue ([896f6fa](https://github.com/horanchikk/ktc-reborn/commit/896f6faefbf030882e7d1eede712893d395c0044))
* **release.config:** обновлен путь к APK файлу с использованием версии следующего релиза; исправлены параметры в autodeploy.yml для загрузки артефакта ([21f1be4](https://github.com/horanchikk/ktc-reborn/commit/21f1be45a824d73232ecabc5dd5a1b1d5f15467c))
* **scripts:** исправлен скрипт для запуска на мобильных устройствах ([5f3fd82](https://github.com/horanchikk/ktc-reborn/commit/5f3fd8275b3979f3360fea12e943cb26d7759315))


### Features

* **app:** добавлены мета-теги для управления масштабированием; улучшена обработка ошибок и обновлений ([a873893](https://github.com/horanchikk/ktc-reborn/commit/a873893d1cc5123137a95886f5ef35222a03787f))
* **ci:** Update autodeploy.yml ([613287e](https://github.com/horanchikk/ktc-reborn/commit/613287e8af3ca2e11154bfb8300aab4c7052d47a))
* **CI:** Update autodeploy.yml ([c6a8cfc](https://github.com/horanchikk/ktc-reborn/commit/c6a8cfcf00d92ffcc83d6ce71506296b79024d2c))
* **ci:** добавлен вывод статуса .env ([b62b896](https://github.com/horanchikk/ktc-reborn/commit/b62b896404696217462870515201095a981dbe7d))
* **markup:** добавлен splash экран ([519231e](https://github.com/horanchikk/ktc-reborn/commit/519231ea40ea1de7c8ac3d97a7f80e7d767906bd))
* **markup:** добавлены иконки для GitHub, Telegram и VK; добавлен компонент PersonCard для отображения информации о пользователях на странице "О приложении" ([914e17a](https://github.com/horanchikk/ktc-reborn/commit/914e17ac346b8f911aef07aac7a864d0c1076aa0))
* **scripts:** обновлен скрипт; удалены лишние этапы ([b5885d6](https://github.com/horanchikk/ktc-reborn/commit/b5885d61b0df1dd4e685ad81d8cc7f6d87f26403))
* **sentry:** записываем ошибки в Sentry ([c0f0bd0](https://github.com/horanchikk/ktc-reborn/commit/c0f0bd080e970c49dd27298935f8226793c84adb))
* **snackbar:** добавлен компонент Snackbar для отображения уведомлений и интеграция в приложение ([c2b744f](https://github.com/horanchikk/ktc-reborn/commit/c2b744fa16348f8682a7697832c310dab5104bf4))

# [0.1.0-dev.23](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.22...v0.1.0-dev.23) (2025-05-02)


### Features

* **config:** обновлена версия java ([916210b](https://github.com/horanchikk/ktc-reborn/commit/916210bf95f797560d3f96c5046fe98e6f64baf6))
* **scripts:** перенос apk в корень проекта ([8f7a332](https://github.com/horanchikk/ktc-reborn/commit/8f7a33200db4652b7c39e0825a626381cf492f7e))

# [0.1.0-dev.22](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.21...v0.1.0-dev.22) (2025-04-29)


### Bug Fixes

* **markup:** исправлена ссылка на редирект из страницы ошибки ([f7f85d0](https://github.com/horanchikk/ktc-reborn/commit/f7f85d02c162b4b82acb6bdbe1e9e9d26f00455c))
* **markup:** исправления для расписания преподавателей ([2628fe8](https://github.com/horanchikk/ktc-reborn/commit/2628fe865ef0511a45290eb746e9bbd7671023ae))
* **modules:** удалён nuxt модуль eslint ([d5c7a1d](https://github.com/horanchikk/ktc-reborn/commit/d5c7a1dec277cce7d606896a376e7a52f61e7a29))
* **api:** исправлено обновление токена ([b2c3a0b](https://github.com/horanchikk/ktc-reborn/commit/b2c3a0bafc877d500bbd6188ec1825a453df571c))
* **auth:** изменён редирект со страницы профиля на страницу настройки ([041c666](https://github.com/horanchikk/ktc-reborn/commit/041c66625589438d525c712fc73d458824169c1d))
* **capacitor:** Обновлена директория сборки ([c109020](https://github.com/horanchikk/ktc-reborn/commit/c1090200eec57312d5a0933f5a323589d9a5a8d8))
* **ci:** Добавлен pnpm для actions ([ad0c63d](https://github.com/horanchikk/ktc-reborn/commit/ad0c63d7946c54d2c817b949f7925c01294ed4b9))
* **ci:** добавлена интеграция с android в github action ([48edc0b](https://github.com/horanchikk/ktc-reborn/commit/48edc0b1cd4422ccbd054df30fe19ce145c32bd5))
* **ci:** добавлена установка pnpm ([0871782](https://github.com/horanchikk/ktc-reborn/commit/0871782e67bf79da6285947825b182a86e14f789))
* **ci:** добавлены отступы для steps ([fd108be](https://github.com/horanchikk/ktc-reborn/commit/fd108be34a6ca98044523dec985f30c4289d1bcd))
* **ci:** изменён метод сборки проекта ([9029247](https://github.com/horanchikk/ktc-reborn/commit/9029247ee5615fe61b51737680d2ee98c94cc49a))
* **ci:** изменён пакетный менеджер на pnpm ([285119b](https://github.com/horanchikk/ktc-reborn/commit/285119b964e4309a0d4c0c7765e7f0f4b8203231))
* **ci:** изменён публикуемый файл ([9d6e975](https://github.com/horanchikk/ktc-reborn/commit/9d6e9750faa2b1b82eaa09d4d902feaf90a5a467))
* **ci:** изменена команда сборки ([ad1810a](https://github.com/horanchikk/ktc-reborn/commit/ad1810ab637d56cf305a8205d0d15361950784f9))
* **ci:** изменено название файла workflow ([d596647](https://github.com/horanchikk/ktc-reborn/commit/d5966476ac0393cdb4157b04c7f4e87d04b9e87c))
* **ci:** исправлен метод сборки с ssr на csr ([dd4ef08](https://github.com/horanchikk/ktc-reborn/commit/dd4ef08e590ad4afbbcf41d30a80ba07cc7e56b5))
* **ci:** исправлены отступы для publishing release ([d945967](https://github.com/horanchikk/ktc-reborn/commit/d945967fb14ef27db2461b6a300c76aea74c5cc2))
* **ci:** обновлён label для apk ([e6490f0](https://github.com/horanchikk/ktc-reborn/commit/e6490f0a43f45ff9b1a6c8f3cdaad98a1fd5fe87))
* **ci:** обновлена версия upload-artifact ([49096b8](https://github.com/horanchikk/ktc-reborn/commit/49096b85b80cbcf362cc74a9568e5be216e3465d))
* **ci:** удалён deploy.yaml ([a0c00ff](https://github.com/horanchikk/ktc-reborn/commit/a0c00ff3019c1e100d7df4d51c4b069402e12f9a))
* **markup:** добавлен select-none ([b519839](https://github.com/horanchikk/ktc-reborn/commit/b519839e45942e5ea4873a659d9958d7560f044b))
* **markup:** изменена ширина блока title ([243e3df](https://github.com/horanchikk/ktc-reborn/commit/243e3dfca277cd240ff23ab078b459f2746ac31d))
* **markup:** исправлен definemodel в select.vue ([7f3a402](https://github.com/horanchikk/ktc-reborn/commit/7f3a402f508bc2a68b0def934da9d79b5553673d))
* **markup:** исправлен skeleton для блога ([ff21349](https://github.com/horanchikk/ktc-reborn/commit/ff21349f4e00d85b3d3c17bcb149f077cae458db))
* **markup:** исправлен лоадер ([727bde1](https://github.com/horanchikk/ktc-reborn/commit/727bde1cdece6298595c6fb0e72566c959e5ffef))
* **markup:** обновлен текст подзаголовка в авторизации ([5799633](https://github.com/horanchikk/ktc-reborn/commit/57996332b111d0bb6325481959a39b339c281357))
* **markup:** обновление цветов ([b7548d7](https://github.com/horanchikk/ktc-reborn/commit/b7548d7a01610ede3d86119f63d0d73f0fc4b96c))
* **markup:** перенесено название группы под название предмета ([2abc6e3](https://github.com/horanchikk/ktc-reborn/commit/2abc6e3868cad109dcfee8eb09a4f14f266e84ae))
* **markup:** скрыты неиспользуемые разделы в sidebar-e ([743b61d](https://github.com/horanchikk/ktc-reborn/commit/743b61d28929596137217ede58d613dfc7237f43))
* **middleware:** обновлён путь перехода для guest-only; удалён setupped-only ([4b015c4](https://github.com/horanchikk/ktc-reborn/commit/4b015c4bd11463ec62c9c74cc92335ad3cbee680))
* **package:** понижена версия eslint ([4d8e762](https://github.com/horanchikk/ktc-reborn/commit/4d8e76299c65835164da21caf46bf60bb6baa78a))
* **pages:** исправлен баг с прогрузкой страницы ([08f95cc](https://github.com/horanchikk/ktc-reborn/commit/08f95cc5c4100667f7be23ae3fe25f76061a2cdc))
* **page:** исправлена работа setup-ов; обновлены пути перехода после выбора ([3b77a37](https://github.com/horanchikk/ktc-reborn/commit/3b77a37894cb864468cf6c0bb3285be8a006ac59))
* **plugins:** обновлен путь для sentry плагина ([9f48dc6](https://github.com/horanchikk/ktc-reborn/commit/9f48dc6e57231af2742948d8cd01405f7f8f6e7c))
* **scripts:** добавлен полный путь к пакету ([ecc1439](https://github.com/horanchikk/ktc-reborn/commit/ecc1439f112a79378922c5e9c547decc4fe77550))
* **scripts:** Добавлено логгирование в pnpm dev ([795b46a](https://github.com/horanchikk/ktc-reborn/commit/795b46a22b8ee11467d60401ad2cd4b47339b9ab))
* **scripts:** изменён запуск на nuxt ([0afb561](https://github.com/horanchikk/ktc-reborn/commit/0afb56196c6c0909c15c3ed8bb165d97ab0aca25))
* **scripts:** исправлен детект dotenv параметра; доработан запуск на android устройствах ([e42bf43](https://github.com/horanchikk/ktc-reborn/commit/e42bf43ba9f455e08b0101cb296722dd187c476f))
* **scripts:** исправлена настройка env android ([8f811ad](https://github.com/horanchikk/ktc-reborn/commit/8f811ad3b79db28e42aa7a891791b8d1d1d6256b))
* **scripts:** исправлено название пакета ([dd41392](https://github.com/horanchikk/ktc-reborn/commit/dd41392654b21791439611265d467d9a45371907))
* **scripts:** обновлено обращение к пакету nuxi ([41ea25e](https://github.com/horanchikk/ktc-reborn/commit/41ea25e09d5e308026e46a158f619012cfa1f936))
* **semantic:** добавлен пакет ([96699ca](https://github.com/horanchikk/ktc-reborn/commit/96699ca970e5fa09586160cf5c13ac5ec8c9d98c))
* **semantic:** добавлен пакет @semantic-release/git ([ff5540e](https://github.com/horanchikk/ktc-reborn/commit/ff5540eaa41e8a4bd94d6b0242bc6713f12fdb30))
* **semantic:** исправлен конфиг semantic release ([7259733](https://github.com/horanchikk/ktc-reborn/commit/72597337c495d84654ccb8fd778630be825a2965))
* **semantic:** обновлены assets для @semantic-release/git ([ef9cbbe](https://github.com/horanchikk/ktc-reborn/commit/ef9cbbe4c2345539de4b086d6ddd72bd0799cda9))

### Features

* **api:** добавлен модуль галереи ([015c214](https://github.com/horanchikk/ktc-reborn/commit/015c2145c58a278a022754af5f6e31f9aee80ee7))
* **api:** добавлены модули блога и новостей в api ([3f09b72](https://github.com/horanchikk/ktc-reborn/commit/3f09b72d6063c98be4a228adfe7aa3bf62d60d70))
* **api:** обновлена логика взаимодействия с API ([b3baa7e](https://github.com/horanchikk/ktc-reborn/commit/b3baa7e0153d69eb4fa361e76f51c116bb9e9512))
* **api:** распределены все запросы по модулям ([c3577d7](https://github.com/horanchikk/ktc-reborn/commit/c3577d7b842fa4e38ae50112cfab38e6257c8fcd))
* **ci:** добавлен gradle перед сборкой APK ([f49d6ee](https://github.com/horanchikk/ktc-reborn/commit/f49d6ee9a51a1064b2fc47410daa84689ec78f34))
* **ci:** обновлен ci github ([4ae5d21](https://github.com/horanchikk/ktc-reborn/commit/4ae5d219c6f076f4d77538db6fbe0c53e317d601))
* **component:** добавлен компонент для OTA-обновлений ([7810db9](https://github.com/horanchikk/ktc-reborn/commit/7810db991656a7088103797ea8cfe83999496cfe))
* **config:** добавлена новая переменная в dotenv ([97f9863](https://github.com/horanchikk/ktc-reborn/commit/97f986306f6bb2363d15a0199b87cf64a554c356))
* **helpers:** добавлен хелпер для детекта ключей объекта ([ac078d2](https://github.com/horanchikk/ktc-reborn/commit/ac078d21db674caa483978a36aadbcf03dff60c5))
* **linting:** переход с eslint на oxlint 🚀 ([a61db7d](https://github.com/horanchikk/ktc-reborn/commit/a61db7d29f186bf0e66c84e208457c03c79b978f))
* **log:** обновили логгирование ([324299b](https://github.com/horanchikk/ktc-reborn/commit/324299be442525f51864e6184a04d24fc6f5f57e))
* **markup:** добавлен раздел галереи в sidebar ([3ef64ad](https://github.com/horanchikk/ktc-reborn/commit/3ef64adc74158e12850b084267f021ebf5a38273))
* **markup:** добавлено центрирование текста выбранной недели ([1fb2c12](https://github.com/horanchikk/ktc-reborn/commit/1fb2c12d664f3f0fd1440f400b9956e10241f75b))
* **markup:** освежил верстку формы ([984d86e](https://github.com/horanchikk/ktc-reborn/commit/984d86e191dd5633e00b179887bad2197e681acb))
* **packages:** добавлен пакет @capacitor/browser для открытия ссылок ([515f757](https://github.com/horanchikk/ktc-reborn/commit/515f7574e729141433fe81e8c124bfa60dd8ea1b))
* **page:** добавлена страница с галерей ([00ae09f](https://github.com/horanchikk/ktc-reborn/commit/00ae09f3fdef132a415f7cd7c7eeafceeb5fbe9c))
* **scripts:** добавлена подготовка nuxt к запуску ([916ad99](https://github.com/horanchikk/ktc-reborn/commit/916ad9972fce093156df516a14c1a9d97cbac00b))
* **store:** добавлен стор для работы с настройками ([14ed234](https://github.com/horanchikk/ktc-reborn/commit/14ed234029b883db672318fd22d2906a50414f8d))
* добавлена логика работа OTA-обновлений ([c5c63b1](https://github.com/horanchikk/ktc-reborn/commit/c5c63b15b7d5a36f358451ce5191c675f8b10204))


# [0.1.0-dev.21](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.20...v0.1.0-dev.21) (2025-04-21)


### Features

* **api:** обновлен запрос в модуль ([5ff3fa2](https://github.com/horanchikk/ktc-reborn/commit/5ff3fa2ddb32c65e97b2a0bfe686b4d512650d6f))
* **markup:** добавлена валидация пар ([5943b88](https://github.com/horanchikk/ktc-reborn/commit/5943b88b0b99aeb33ff1cb95a904ba06949272fb))
* обновлен gitignore ([aa26720](https://github.com/horanchikk/ktc-reborn/commit/aa26720c027f3e2ee10cf7fa7e09501daaa67a89))

# [0.1.0-dev.20](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.19...v0.1.0-dev.20) (2025-02-12)


### Features

* **gitignore:** обновлён gitignore ([71341f0](https://github.com/horanchikk/ktc-reborn/commit/71341f01f68bd57d2903ecb580b757a8aa8577c5))
* **scripts:** добавлен скрипт с дополнительным функционалом для основного скрипта ([b34472e](https://github.com/horanchikk/ktc-reborn/commit/b34472e67e180a373a08b448ca0fb616481e3acc))
* **scripts:** добавлена конфигурация проекта ([2b1279d](https://github.com/horanchikk/ktc-reborn/commit/2b1279dab36770d5d70020a1c4bfd37486887b2f))
* **scripts:** обновлен скрипт для закачки файлов ([070ddbc](https://github.com/horanchikk/ktc-reborn/commit/070ddbc89976ff97171f447f5ae987570598be48))
* **scripts:** обновление основного скрипта [оптимизация кода; обновление названий задач; обновление таски для Android сборки] ([e5a3b7f](https://github.com/horanchikk/ktc-reborn/commit/e5a3b7f497400a764082953b069a5beee853f507))
* **scripts:** удалён старый скрипт проверки файлов ([7125978](https://github.com/horanchikk/ktc-reborn/commit/71259783b9670f50d6a214be5e4d31cfc4cc1b15))
* обновлён README ([c876b7b](https://github.com/horanchikk/ktc-reborn/commit/c876b7b0a0135069ffa25c274935d47da1f134db))

# [0.1.0-dev.19](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.18...v0.1.0-dev.19) (2025-02-01)


### Bug Fixes

* **scripts:** изменён запуск на nuxt ([0afb561](https://github.com/horanchikk/ktc-reborn/commit/0afb56196c6c0909c15c3ed8bb165d97ab0aca25))


### Features

* **markup:** Добавлено примерное время пар в расписании студента ([9b3abfc](https://github.com/horanchikk/ktc-reborn/commit/9b3abfcf18d8b330ec8e62a0017c94ef7bce1e4f)), closes [#11](https://github.com/horanchikk/ktc-reborn/issues/11)
* **markup:** добавлено примерное время расписания ([6da8767](https://github.com/horanchikk/ktc-reborn/commit/6da87677f2be44ce238c32a586cadacd4e9b5aac))
* **scripts:** добавляем установку утилит ([8fe851f](https://github.com/horanchikk/ktc-reborn/commit/8fe851f5cb8963fe9f80f92cccf88a1b6407b0e9))
* **scripts:** обязательные обновления скриптовa ([ac6f887](https://github.com/horanchikk/ktc-reborn/commit/ac6f88796963bc16fabd036f527aa326229a4fd7)), closes [#10](https://github.com/horanchikk/ktc-reborn/issues/10)

# [0.1.0-dev.18](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.17...v0.1.0-dev.18) (2025-01-09)


### Bug Fixes

* **ci:** изменена команда сборки ([ad1810a](https://github.com/horanchikk/ktc-reborn/commit/ad1810ab637d56cf305a8205d0d15361950784f9))

# [0.1.0-dev.17](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.16...v0.1.0-dev.17) (2025-01-09)


### Bug Fixes

* **ci:** изменён публикуемый файл ([9d6e975](https://github.com/horanchikk/ktc-reborn/commit/9d6e9750faa2b1b82eaa09d4d902feaf90a5a467))

# [0.1.0-dev.16](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.15...v0.1.0-dev.16) (2025-01-09)


### Features

* **markup:** добавлена иконка chevron-left-alt.svg ([433986b](https://github.com/horanchikk/ktc-reborn/commit/433986b6d7c50c589f01e290cda174da96dadcdb))

# [0.1.0-dev.15](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.14...v0.1.0-dev.15) (2025-01-08)


### Features

* **scripts:** добавлена автоматическая установка всех необходимых утилит для корректного запуска под android ([96bb53a](https://github.com/horanchikk/ktc-reborn/commit/96bb53aa3f69c91ebbfa031a865d15eeb4e506fc))

# [0.1.0-dev.14](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.13...v0.1.0-dev.14) (2024-12-13)


### Bug Fixes

* **ci:** добавлена интеграция с android в github action ([48edc0b](https://github.com/horanchikk/ktc-reborn/commit/48edc0b1cd4422ccbd054df30fe19ce145c32bd5))
* **ci:** добавлена установка pnpm ([0871782](https://github.com/horanchikk/ktc-reborn/commit/0871782e67bf79da6285947825b182a86e14f789))
* **ci:** добавлены отступы для steps ([fd108be](https://github.com/horanchikk/ktc-reborn/commit/fd108be34a6ca98044523dec985f30c4289d1bcd))
* **ci:** изменён метод сборки проекта ([9029247](https://github.com/horanchikk/ktc-reborn/commit/9029247ee5615fe61b51737680d2ee98c94cc49a))
* **ci:** изменён пакетный менеджер на pnpm ([285119b](https://github.com/horanchikk/ktc-reborn/commit/285119b964e4309a0d4c0c7765e7f0f4b8203231))
* **ci:** изменено название файла workflow ([d596647](https://github.com/horanchikk/ktc-reborn/commit/d5966476ac0393cdb4157b04c7f4e87d04b9e87c))
* **ci:** исправлен метод сборки с ssr на csr ([dd4ef08](https://github.com/horanchikk/ktc-reborn/commit/dd4ef08e590ad4afbbcf41d30a80ba07cc7e56b5))
* **ci:** исправлены отступы для publishing release ([d945967](https://github.com/horanchikk/ktc-reborn/commit/d945967fb14ef27db2461b6a300c76aea74c5cc2))
* **ci:** обновлён label для apk ([e6490f0](https://github.com/horanchikk/ktc-reborn/commit/e6490f0a43f45ff9b1a6c8f3cdaad98a1fd5fe87))
* **ci:** обновлена версия upload-artifact ([49096b8](https://github.com/horanchikk/ktc-reborn/commit/49096b85b80cbcf362cc74a9568e5be216e3465d))


### Features

* **action:** добавлена сборка android приложения ([11a3b5d](https://github.com/horanchikk/ktc-reborn/commit/11a3b5d4a8c75117283dc65103d93010a7024af1))
* **ci:** добавлена загрузка файла apk в релизы ([58ed5df](https://github.com/horanchikk/ktc-reborn/commit/58ed5df28c7a23bc62a4762afff982cb0e5e6e83))
* **ci:** добавлено ожидание прошлой job ([14b4cc7](https://github.com/horanchikk/ktc-reborn/commit/14b4cc73fe117f0c2001daae49819e8710f28ac6))
* **scripts:** добавлен текст для скриптов ([b727841](https://github.com/horanchikk/ktc-reborn/commit/b727841a9e26964b3af8a51d5324e54dde97e4fd))

# [0.1.0-dev.13](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.12...v0.1.0-dev.13) (2024-11-18)


### Bug Fixes

* **scripts:** исправлена настройка env android ([8f811ad](https://github.com/horanchikk/ktc-reborn/commit/8f811ad3b79db28e42aa7a891791b8d1d1d6256b))

# [0.1.0-dev.12](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.11...v0.1.0-dev.12) (2024-11-17)


### Features

* **header:** добавлен функционал дополнительного меню; обновлены названия логов ([bd1b339](https://github.com/horanchikk/ktc-reborn/commit/bd1b33986e54a283e8d42d0f33b53da3ce88282b))

# [0.1.0-dev.11](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.10...v0.1.0-dev.11) (2024-11-17)


### Features

* auditory choosing ([f4a41dd](https://github.com/horanchikk/ktc-reborn/commit/f4a41dd29fa84251f493e55bb07597147a40e958))
* **page:** добавлена страница расписания аудитории; уменьшен размер индекса урока ([fc01321](https://github.com/horanchikk/ktc-reborn/commit/fc01321028f33211092dd255f850a9e04e0bb09e))

# [0.1.0-dev.10](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.9...v0.1.0-dev.10) (2024-11-17)


### Features

* rendering auditories ([dbe48b4](https://github.com/horanchikk/ktc-reborn/commit/dbe48b4f72005e4dba9dc07e9dc4a5d8820b6c0c))

# [0.1.0-dev.9](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.8...v0.1.0-dev.9) (2024-11-17)


### Bug Fixes

* **pages:** исправлен баг с прогрузкой страницы ([08f95cc](https://github.com/horanchikk/ktc-reborn/commit/08f95cc5c4100667f7be23ae3fe25f76061a2cdc))

# [0.1.0-dev.8](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.7...v0.1.0-dev.8) (2024-11-17)


### Bug Fixes

* **scripts:** добавлен полный путь к пакету ([ecc1439](https://github.com/horanchikk/ktc-reborn/commit/ecc1439f112a79378922c5e9c547decc4fe77550))

# [0.1.0-dev.7](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.6...v0.1.0-dev.7) (2024-11-17)


### Bug Fixes

* **scripts:** исправлено название пакета ([dd41392](https://github.com/horanchikk/ktc-reborn/commit/dd41392654b21791439611265d467d9a45371907))
* **scripts:** обновлено обращение к пакету nuxi ([41ea25e](https://github.com/horanchikk/ktc-reborn/commit/41ea25e09d5e308026e46a158f619012cfa1f936))

# [0.1.0-dev.6](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.5...v0.1.0-dev.6) (2024-11-17)


### Bug Fixes

* **package:** понижена версия eslint ([4d8e762](https://github.com/horanchikk/ktc-reborn/commit/4d8e76299c65835164da21caf46bf60bb6baa78a))
* **scripts:** Добавлено логгирование в pnpm dev ([795b46a](https://github.com/horanchikk/ktc-reborn/commit/795b46a22b8ee11467d60401ad2cd4b47339b9ab))
* **scripts:** исправлен детект dotenv параметра; доработан запуск на android устройствах ([e42bf43](https://github.com/horanchikk/ktc-reborn/commit/e42bf43ba9f455e08b0101cb296722dd187c476f))

# [0.1.0-dev.5](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.4...v0.1.0-dev.5) (2024-11-15)


### Bug Fixes

* **markup:** исправлен skeleton для блога ([ff21349](https://github.com/horanchikk/ktc-reborn/commit/ff21349f4e00d85b3d3c17bcb149f077cae458db))

# [0.1.0-dev.4](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.3...v0.1.0-dev.4) (2024-11-15)


### Bug Fixes

* **markup:** изменена ширина блока title ([243e3df](https://github.com/horanchikk/ktc-reborn/commit/243e3dfca277cd240ff23ab078b459f2746ac31d))

# [0.1.0-dev.3](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.2...v0.1.0-dev.3) (2024-11-15)


### Bug Fixes

* **markup:** перенесено название группы под название предмета ([2abc6e3](https://github.com/horanchikk/ktc-reborn/commit/2abc6e3868cad109dcfee8eb09a4f14f266e84ae))

# [0.1.0-dev.2](https://github.com/horanchikk/ktc-reborn/compare/v0.1.0-dev.1...v0.1.0-dev.2) (2024-11-15)


### Features

* **markup:** добавлено обновление названия предмета; добавлен lesson.group ([4a4ad6f](https://github.com/horanchikk/ktc-reborn/commit/4a4ad6f1fde00c701d9980cd1caeb8ca38c96d3b))

# [0.1.0-dev.1](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.6...v0.1.0-dev.1) (2024-11-14)


### Features

* **scripts:** добавлен скрипт для запуска в android напрямую ([927cc1d](https://github.com/horanchikk/ktc-reborn/commit/927cc1dab9c1615e7769980f741d636e003d11bd))

## [0.0.2-dev.6](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.5...v0.0.2-dev.6) (2024-11-14)


### Bug Fixes

* **api:** исправлено обновление токена ([b2c3a0b](https://github.com/horanchikk/ktc-reborn/commit/b2c3a0bafc877d500bbd6188ec1825a453df571c))
* **middleware:** обновлён путь перехода для guest-only; удалён setupped-only ([4b015c4](https://github.com/horanchikk/ktc-reborn/commit/4b015c4bd11463ec62c9c74cc92335ad3cbee680))
* **page:** исправлена работа setup-ов; обновлены пути перехода после выбора ([3b77a37](https://github.com/horanchikk/ktc-reborn/commit/3b77a37894cb864468cf6c0bb3285be8a006ac59))
* **plugins:** обновлен путь для sentry плагина ([9f48dc6](https://github.com/horanchikk/ktc-reborn/commit/9f48dc6e57231af2742948d8cd01405f7f8f6e7c))

## [0.0.2-dev.5](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.4...v0.0.2-dev.5) (2024-11-14)


### Bug Fixes

* **ci:** удалён deploy.yaml ([a0c00ff](https://github.com/horanchikk/ktc-reborn/commit/a0c00ff3019c1e100d7df4d51c4b069402e12f9a))

## [0.0.2-dev.4](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.3...v0.0.2-dev.4) (2024-11-14)


### Bug Fixes

* **auth:** изменён редирект со страницы профиля на страницу настройки ([041c666](https://github.com/horanchikk/ktc-reborn/commit/041c66625589438d525c712fc73d458824169c1d))
* **markup:** исправлен definemodel в select.vue ([7f3a402](https://github.com/horanchikk/ktc-reborn/commit/7f3a402f508bc2a68b0def934da9d79b5553673d))
* **markup:** исправлен лоадер ([727bde1](https://github.com/horanchikk/ktc-reborn/commit/727bde1cdece6298595c6fb0e72566c959e5ffef))

## [0.0.2-dev.3](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.2...v0.0.2-dev.3) (2024-11-14)


### Bug Fixes

* **markup:** добавлен select-none ([b519839](https://github.com/horanchikk/ktc-reborn/commit/b519839e45942e5ea4873a659d9958d7560f044b))
* **markup:** обновлен текст подзаголовка в авторизации ([5799633](https://github.com/horanchikk/ktc-reborn/commit/57996332b111d0bb6325481959a39b339c281357))
* **markup:** обновление цветов ([b7548d7](https://github.com/horanchikk/ktc-reborn/commit/b7548d7a01610ede3d86119f63d0d73f0fc4b96c))
* **markup:** скрыты неиспользуемые разделы в sidebar-e ([743b61d](https://github.com/horanchikk/ktc-reborn/commit/743b61d28929596137217ede58d613dfc7237f43))

## [0.0.2-dev.2](https://github.com/horanchikk/ktc-reborn/compare/v0.0.2-dev.1...v0.0.2-dev.2) (2024-11-11)


### Bug Fixes

* **ci:** Добавлен pnpm для actions ([ad0c63d](https://github.com/horanchikk/ktc-reborn/commit/ad0c63d7946c54d2c817b949f7925c01294ed4b9))
* **semantic:** добавлен пакет @semantic-release/git ([ff5540e](https://github.com/horanchikk/ktc-reborn/commit/ff5540eaa41e8a4bd94d6b0242bc6713f12fdb30))
* **semantic:** обновлены assets для @semantic-release/git ([ef9cbbe](https://github.com/horanchikk/ktc-reborn/commit/ef9cbbe4c2345539de4b086d6ddd72bd0799cda9))
