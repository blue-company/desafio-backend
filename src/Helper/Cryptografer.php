<?php

namespace App\Helper;

class Cryptografer
{
    private string $key = 'SODIUM_CRYPTO_AEAD_AES256GCM_KEY';
    private string $nounce = 'blablablabla';

    public function encript($data): string {
        return base64_encode(
            sodium_crypto_aead_aes256gcm_encrypt(
                                                    $data,
                                                    '',
                                                    $this->nounce,
                                                    $this->key
                                                )   
        );
    }

    public function decript($data): string {
        $packed = base64_decode($data);
        return sodium_crypto_aead_aes256gcm_decrypt(
                                                    $packed,
                                                    '',
                                                    $this->nounce,
                                                    $this->key
                                                );
    }
}