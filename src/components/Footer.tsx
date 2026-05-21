export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-gray-500">
          SelfMetrics &mdash; Desenvolvido para a disciplina de{' '}
          <a
            href="https://github.com/guscarvalhol/Engenharia-de-Prompt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
          >
            Engenharia de Prompt e Aplicações de IA
          </a>
        </p>
      </div>
    </footer>
  );
}
