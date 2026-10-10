# ตรวจและเผยแพร่ทีละขั้น

ฉบับนี้แยกจาก `ecommerce-admin` / `ecommerce-store` เดิม ไม่ต้องลบหรือ force-push repository เก่า

สถานะวันที่ 10 ตุลาคม 2026: repo ใหม่เป็น Public หลัง CI ผ่าน และ [live demo บน Vercel](https://ecommerce-portfolio-nine-lyart.vercel.app/) ผ่าน Playwright 4 executions โดยไม่ login แล้ว ขั้นตอนด้านล่างเก็บไว้เป็นคู่มือทำซ้ำและตรวจเมื่อแก้โค้ด

## 1. ตรวจในเครื่อง

ใช้ Node.js **24 LTS รุ่นปัจจุบัน** จาก [เว็บไซต์ Node.js](https://nodejs.org/en/download) แล้วเปิด terminal ใหม่ ตรวจ `node --version` ก่อนเริ่ม เครื่องเดิมมี Node 20.10 ซึ่งเก่าเกินไปสำหรับชุดเครื่องมือในฉบับนี้

```powershell
node --version
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
npm audit
```

ผลที่คาดหวัง: lint/typecheck/build ผ่าน, unit/component 10 tests ผ่าน, Playwright 4 executions ผ่าน และ audit ไม่มีรายการช่องโหว่ ณ วันที่เตรียมงาน ทั้งนี้ advisory อาจเปลี่ยนภายหลัง

เปิด demo:

```powershell
npm run dev
```

เข้า `http://localhost:3000` ลองค้นหา coral, กรอง Audio, sort ราคา, เพิ่มสินค้าใน bag, เปลี่ยนจำนวน, refresh และ Complete demo

## 2. ตรวจ secrets และไฟล์ที่จะเผยแพร่

ติดตั้ง [Gitleaks](https://github.com/gitleaks/gitleaks/releases) แล้วรัน:

```powershell
gitleaks git . --log-opts='--all --full-history' --redact=100 --ignore-gitleaks-allow
git ls-files
git status --short
git check-ignore --no-index .env .env.production .env.example node_modules/package.json .next/cache/example
```

`.env.example` ต้องไม่อยู่ในรายการ ignored ส่วน `.env`, `.env.production`, node_modules และ .next ต้องถูก ignore ห้ามเพิ่ม credentials หรือข้อมูลลูกค้าเพื่อให้ demo รันได้ เพราะ demo นี้ไม่ต้องใช้

ถ้าพบ secret ที่เคยเผยแพร่: rotate/revoke ก่อนแก้ประวัติ ไม่ใช่แค่ลบไฟล์

## 3. อ่าน commit เป็นช่วงเล็ก ๆ

ฉบับเตรียมงานแบ่งตามลำดับนี้:

1. `chore: establish isolated portfolio tooling` — dependency versions, ignore rules และ configuration ตรวจด้วย `npm ci` และอ่าน `.env.example`
2. `feat: add AI-assisted synthetic storefront and demo bag` — UI, catalog, reducer, read-only API ตรวจโดยเปิดเว็บและลอง flow
3. `test: add behavior tests and CI release checks` — 10 tests และ Playwright 2 journeys บน 2 viewport ตรวจด้วย `npm run check` และ `npm run test:e2e`
4. `docs: explain provenance verification and portfolio setup` — README, credits, screenshots, license และคู่มือ ตรวจลิงก์/ข้อความก่อนเผยแพร่

```powershell
git log --oneline
git show --stat HEAD
```

เมื่อแก้เอง ให้เพิ่มเฉพาะไฟล์ที่ตั้งใจ เช่น `git add -- lib/catalog.ts tests/catalog.test.ts` แล้วอ่าน `git diff --cached` ก่อน commit ไม่ใช้ `git add .` กับโฟลเดอร์เก่าที่ยังมีรูปและข้อมูลค้าง

## 4. GitHub Actions ก่อนเปิด public

Repository เป้าหมาย: `skafosy/ecommerce-portfolio` แยกจากสอง repo เก่า

1. สร้างเป็น Private ก่อนและไม่ initialize README ซ้ำ
2. เชื่อม Git กับบัญชีของคุณผ่าน login ปกติ อย่าส่ง token/password ในแชต
3. ตรวจว่า origin ชี้ repo ใหม่ แล้ว push main
4. เปิด Actions → CI ดู commit ล่าสุด ทุกขั้นต้องเขียว รวม lint → typecheck → test → build
5. เมื่อ scan และ CI ผ่านแล้วจึงเปลี่ยน repo ใหม่นี้เป็น Public ไม่เปลี่ยน visibility ของหลังร้านเดิม

ถ้า repo ว่างและ local มี commit แล้ว:

```powershell
git remote -v
git push -u origin main
```

อย่าใช้ force push ถ้า push ถูกปฏิเสธ ให้ตรวจสาเหตุก่อน

## 5. Vercel

1. Login บัญชีเดิม → Add New Project → Import `ecommerce-portfolio`
2. Framework: Next.js, Root Directory: repository root, Node.js: 24.x
3. ใช้ `npm ci` และ `npm run build` ไม่ต้องใส่ Environment Variables
4. หากต้องเพิ่มสิทธิ์ GitHub ให้ Vercel ให้จำกัดเฉพาะ repo ที่จะ deploy และอ่านหน้าสิทธิ์ด้วยตัวเอง
5. กด Deploy แล้วทดสอบ URL ที่ Vercel ให้จริงใน browser ที่ไม่ login
6. ตรวจ home, product, cart, sold-out, 404 และ mobile layout
7. แทนข้อความ deployment pending ใน README ด้วย URL จริง อัปเดต About ของ repo แล้ว commit เอกสาร

อย่าสร้างลิงก์ `*.vercel.app` ขึ้นเองและอ้างว่าใช้งานได้ถ้ายังไม่ได้เปิดตรวจ ถ้า Vercel ขอใช้แผนเสียเงิน ไม่ต้องซื้อเพื่อทำ demo นี้

## 6. GitHub profile และใบสมัคร

ใช้ข้อความในชุดสมัครงานที่เตรียมแยกไว้นอก source repo ใส่ลิงก์ live เมื่อผ่านการตรวจจริงแล้ว Pin `pos-sales-etl-demo` และ `ecommerce-portfolio` หลัง repo ที่สองเป็น public

อีเมลเป็น draft เท่านั้น ผู้สมัครต้องตรวจชื่อ ข้อความ และแนบ Resume ก่อนส่ง ไม่อ้างว่ามีประสบการณ์ React หรือ Go ในงานจริง
