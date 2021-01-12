CWD="$(pwd)"
for D in `ls -d packages`
do
    echo "---------------- RUN ON $CWD/packages/$D --------------------"
    cd "$CWD/packages/$D"
    yarn prepare
done
cd "$CWD"