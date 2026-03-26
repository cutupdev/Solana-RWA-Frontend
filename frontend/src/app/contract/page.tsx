import { ProgramInteraction } from "@/components/contract/ProgramInteraction";
import { ProgramQuickRef } from "@/components/contract/ProgramQuickRef";
import { getRwaProgramId } from "@/lib/solana/constants";

export default function ContractPage() {
  const pid = getRwaProgramId();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Smart contract</h1>
        <p className="mt-1 text-sm text-zinc-400">
          {pid ? (
            <>
              Loaded program id from env:{" "}
              <span className="font-mono text-accent">{pid.toBase58()}</span>
            </>
          ) : (
            <>
              Set <code className="text-zinc-500">NEXT_PUBLIC_RWA_PROGRAM_ID</code>{" "}
              in <code className="text-zinc-500">.env.local</code> to pre-fill the
              form.
            </>
          )}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ProgramInteraction />
        <ProgramQuickRef />
      </div>
    </div>
  );
}
