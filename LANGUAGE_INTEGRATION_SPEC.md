Integrations

* grammars
  * regular tree grammar
  * in normal form, specifically:
    * rules have one of these forms: (t = terminal, N = non-terminal)
      * N → t
      * (or) N → t[N₁...Nₙ] (Nₙ may = N)
  * additionally, for every t on the right hand side, the N on the left hand side must be the same across all rules
    * a restriction, planned to be temporary, that allows us to assign the producing rule to every syno using only local data
  * but, for clarity, you may:
    * have multiple rules with the same RHS t
    * have multiple rules with the same LHS N
      * even with different RHS t
* presenters
  * presno attr keys must be strings
  * presno attr keys cannot consist of only digits, because that affects ordering  
