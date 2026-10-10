# อ่านและลองก่อนสัมภาษณ์

ทำทีละข้อ อย่าเพียงจำคำตอบหรือบอกว่าคุณตรวจแล้วถ้ายังไม่ได้ลอง

1. เปิด `lib/catalog.ts` แล้วอธิบายว่า `Product` มีอะไร และทำไมราคา 1,890 บาทจึงเก็บเป็น 189000 satang เปลี่ยนสีหรือ stock ของสินค้าสมมติหนึ่งชิ้น แล้วรัน `npm run check`
2. เปิด `components/catalog.tsx` ไล่จาก input → state → filterProducts → ProductCard ลองค้นหา “coral”, เปลี่ยนหมวด แล้วล้างตัวกรอง อธิบายว่าเหตุใดจึงต้องสร้าง array ใหม่ก่อน sort
3. เปิด `app/product/[productId]/page.tsx` เทียบกับ `components/add-to-cart.tsx` อธิบายว่าไฟล์ไหนเป็น Server/Client Component และเหตุใดปุ่มจึงต้องมี state
4. เปิด `lib/cart.ts` ไล่ action add, quantity, remove และ clear ลองใส่ 100 ชิ้นใน unit test แล้วตรวจว่าระบบ cap ตาม stock
5. เปิด `components/cart-provider.tsx` อธิบายว่าทำไมอ่าน localStorage หลัง hydration และทำไมต้องรอ ready ก่อนเขียนกลับ ลอง refresh หน้าตะกร้า
6. ลองแก้ accessible name ของปุ่ม Clear filters ให้ผิด แล้วรัน `npm test` เพื่อเห็นเทสต์ fail จากนั้นคืนค่าและทดสอบให้ผ่าน คุณจึงสามารถพูดได้ตามจริงว่าได้ลองทำ regression นี้ด้วยตัวเอง
7. ลองเข้า `/product/unknown` และเลือก Sand headset ที่ stock เป็น 0 ต้องได้หน้า 404 และปุ่ม Out of stock ตามลำดับ
8. ตรวจ README ว่าข้อใดคุณอธิบายได้แล้ว ข้อใดยังต้องเรียนรู้ ห้ามเปลี่ยนคำว่า AI-assisted เป็นคำว่าเขียนเองทั้งหมด

## ซ้อม live coding 30 นาที

โจทย์: เพิ่มตัวเลือก “In stock only” ใน catalog

- 5 นาที: อธิบาย behavior ก่อนเขียน เช่น ซ่อนสินค้าที่ stock = 0 และทำงานร่วมกับ search/category ได้
- 10 นาที: ให้ AI เสนอการแก้ แล้วอ่านว่า state ถูกส่งเข้า filter ตรงไหน อย่ายอมให้ AIเปลี่ยนราคา/stock เพื่อให้เทสต์ผ่าน
- 10 นาที: เพิ่ม behavior test แล้วลองกดจริง
- 5 นาที: รัน lint/typecheck/tests และอธิบาย diff เป็นภาษาอังกฤษสั้น ๆ

โจทย์นี้ยังไม่ได้ทำให้ เพื่อให้คุณได้ลงมือแก้ด้วยตัวเองจริง
