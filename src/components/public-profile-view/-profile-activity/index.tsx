import { useQuery } from "@tanstack/react-query";
import { publicUserPaymentsQueryOptions } from "@/lib/api/users";
import { centsToDecimal, formatCurrency, formatDate, formatNumber } from "@/lib/format";

interface Props {
  username: string;
}

export function ProfileActivity({ username }: Props) {
  const { data } = useQuery(publicUserPaymentsQueryOptions(username));
  if (!data) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-zinc-100">Recent activity</h2>
        <div className="mt-2 h-px w-12 bg-gold" />
      </div>
      <div className="bg-zinc-900/30 ring-1 ring-white/5">
        {data.payments.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-zinc-500">No recent activity.</div>
        ) : (
          data.payments.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border-b border-zinc-900 px-6 py-4"
            >
              <div>
                <p className="text-sm text-zinc-100">Paid {formatCurrency(centsToDecimal(p.amount))}</p>
                <p className="text-xs text-zinc-500">{formatDate(p.createdAt)}</p>
              </div>
              <span className="text-sm font-semibold text-gold">+{formatNumber(p.points)} pts</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
