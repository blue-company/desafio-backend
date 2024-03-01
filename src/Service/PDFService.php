<?php

namespace App\Service;

use Dompdf\Dompdf;

class PDFService {
    public function renderPdf(string $html): void {
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();
        $dompdf->stream('consulta.pdf', ['Attachment' => false]);
    }
}