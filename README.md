# Tanıştığımızdan beri

Nazlı için hazırlanmış Türkçe, tek sayfalık bir mektup. Giriş kodu `1212`. Sayaç 19 Eylül 2026 saat 23.56’dan itibaren geçen süreyi Türkiye saati esas alınarak gösterir.

## Yerel önizleme

Proje klasöründe Python ile yerel web sunucusunu başlat.

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Tarayıcıda [yerel önizlemeyi](http://127.0.0.1:8000/) aç. Giriş aynı sekmede yenileme sonrasında hatırlanır. Giriş ekranını tekrar görmek için bağlantıyı bağımsız bir sekmede aç.

## GitHub Pages’te yayınlama

1. Proje dosyalarını bir GitHub deposunun `main` dalına yükle. `.nojekyll` dosyasını ve `assets` klasörünü de ekle. Sitenin kullandığı video `assets/nazlima-video.mp4` dosyasıdır. `video.mp4` düzenleme için yerelde duran orijinal kayıttır.
2. Depoda **Settings → Pages** bölümüne git. **Source** alanında **Deploy from a branch** seç.
3. Dal olarak **`main`**, klasör olarak **`/(root)`** seçip **Save** düğmesine bas.
4. Yayın tamamlandığında Pages ayarlarındaki site bağlantısını aç. Paylaşmadan önce telefonda şifreyi, zarfı, videoyu ve şarkıyı dene.

Şifre tarayıcıda kontrol edilir. Yayımlanan dosyaları inceleyen biri şifreye, mektuba ve videoya ulaşabilir.
